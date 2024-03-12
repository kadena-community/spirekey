'use client';

import { AccountButton } from '@/components/AccountButton';
import { Button } from '@/components/Button/Button';
import { OrderSummary } from '@/components/Delivery/OrderSummary/OrderSummary';
import { Product } from '@/components/Delivery/Product/Product';
import { PizzaLoader } from '@/components/PizzaLoader/PizzaLoader';
import { Surface } from '@/components/Surface/Surface';
import { PizzaWorld } from '@/components/icons/PizzaWorld';
import { useNotifications } from '@/context/NotificationsContext';
import { useOrder } from '@/context/OrderContext';
import { useReturnUrl } from '@/hooks/useReturnUrl';
import { SubmitStatus, useSubmit } from '@/hooks/useSubmit';
import { getAccountFromChain } from '@/utils/account';
import { getDevnetNetworkId } from '@/utils/getDevnetNetworkId';
import { getSmartContractMeta } from '@/utils/smartContractMeta';
import { Heading, Stack } from '@kadena/react-ui';
import { ChainId } from '@kadena/types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useConnection } from '../../app/v1/example/delivery/Connection';
import * as styles from '../../app/v1/example/delivery/order.css';
import {
  createOrderId,
  getOrderDetails,
  useDelivery,
} from '../../app/v1/example/delivery/useDelivery';
import { useLoggedInAccount } from '../../app/v1/example/delivery/useLoggedInAccount';

type Props = {
  searchParams: {
    user: string;
    transaction: string;
  };
};

type OrderStatus =
  | 'processing'
  | 'crafting'
  | 'ready'
  | 'transit'
  | 'delivering'
  | 'signing'
  | 'delivered'
  | 'completed'
  | undefined;

export default function Customer({ searchParams }: Props) {
  const { user } = searchParams;
  const { tx } = useSubmit(searchParams);
  const { account, logout } = useLoggedInAccount(user);
  const { messages, setId, send, isLoading } = useConnection();
  const { getReturnUrl } = useReturnUrl();
  const { orders, createOrder, saveDelivery } = useDelivery({
    chainId: process.env.CHAIN_ID as ChainId,
    networkId: process.env.DAPP_NETWORK_ID!,
  });
  const { status, doSubmit } = useSubmit(searchParams);
  const router = useRouter();
  const [merchantPublicKey, setMerchantPublicKey] = useState<string>('');
  const { products, orderItems, orderTotalPrice, deliveryFee } = useOrder();
  const { addNotification } = useNotifications();

  const merchantAccount = process.env.MERCHANT_ACCOUNT;

  if (!merchantAccount) {
    throw new Error('Merchant account is not configured.');
  }

  const { getValues } = useForm({
    defaultValues: {
      receiver: merchantAccount,
      amount: 1,
    },
    reValidateMode: 'onChange',
  });

  const onSend = async () => {
    if (!account) return;
    const id = Date.now().toString();
    const tx = await createOrder({
      customerAccount: account.accountName,
      customerPublicKey: account.credentials[0].publicKey,
      merchantAccount,
      merchantPublicKey,
      deliveryPrice: 6.25,
      orderPrice: orderTotalPrice,
      orderId: id,
      orderItems: [...orderItems, deliveryFee],
    });
    const orderId = createOrderId({
      customer: account.accountName,
      merchant: merchantAccount,
      orderId: id,
    });

    const details = getOrderDetails({
      orderId,
      buyerAccount: account.accountName,
      merchantAccount,
      orderItems: [...orderItems, deliveryFee],
    });
    const customTranslations = details.reduce((bundle, detail) => {
      return {
        ...bundle,
        [detail.translationKey]: detail.translation,
      };
    }, {});
    saveDelivery(orderId, customTranslations);
    router.push(
      `${process.env.WALLET_URL}/sign?transaction=${Buffer.from(
        JSON.stringify(tx),
      ).toString(
        'base64',
      )}&returnUrl=${getReturnUrl('/v1/example/delivery')}&meta=${Buffer.from(
        JSON.stringify(getSmartContractMeta()),
      ).toString('base64')}&translations=${Buffer.from(
        JSON.stringify(customTranslations),
      ).toString('base64')}`,
    );
  };

  const deliverTx = [...messages].find((m) => m.type === 'tx');
  const onAcceptDelivery = async () => {
    if (!deliverTx) return;
    router.push(
      `${process.env.WALLET_URL}/sign?transaction=${Buffer.from(
        JSON.stringify(deliverTx.data),
      ).toString(
        'base64',
      )}&returnUrl=${getReturnUrl('/v1/example/delivery')}&meta=${Buffer.from(
        JSON.stringify(getSmartContractMeta()),
      ).toString('base64')}`,
    );
  };

  useEffect(() => {
    if (!merchantAccount) return;
    const fetchMerchantAccount = async () => {
      try {
        const remoteMerchantAccount = await getAccountFromChain({
          networkId: process.env.NETWORK_ID || getDevnetNetworkId(),
          accountName: merchantAccount,
        });
        setMerchantPublicKey(remoteMerchantAccount.devices[0].guard.keys[0]);
      } catch (error: unknown) {
        if (error instanceof Error) {
          addNotification({
            variant: 'error',
            title: 'Merchant account was not found',
            message: error.message,
          });
        }
      }
    };
    fetchMerchantAccount();
  }, [merchantAccount, setMerchantPublicKey]);

  useEffect(() => {
    if (isLoading) return;
    if (!account?.accountName) return;
    setId({ id: '1234', publicKey: account?.accountName });
  }, [account?.accountName, isLoading]);

  useEffect(() => {
    if (isLoading) return;
    if (!tx) return;
    if (deliverTx) return;
    const orderId = localStorage.getItem('newOrderId');
    const customTranslations = JSON.parse(
      localStorage.getItem(`delivery-${orderId}`) || '{}',
    );
    if (!orderId) return;

    send(
      { id: '1234', publicKey: getValues('receiver') },
      { type: 'create', data: tx, orderId, customTranslations },
    );
  }, [tx, isLoading, deliverTx]);

  const isAcceptingOrder = tx && deliverTx?.data?.hash !== tx.hash;

  useEffect(() => {
    if (isLoading) return;
    if (status !== SubmitStatus.SUBMITABLE) return;
    if (isAcceptingOrder) return;
    doSubmit();
  }, [tx, isLoading, deliverTx, status]);

  const pendingTx = tx && !messages.some((m) => m.data.hash === tx.hash);
  const mintedTx = tx && messages.some((m) => m.data.hash === tx.hash);

  const order = orders?.find(
    (o) => o.orderId === localStorage.getItem('newOrderId'),
  );

  const getOrderStatus = (): OrderStatus => {
    if (status === SubmitStatus.LOADING) return 'signing';
    if (status === SubmitStatus.SUCCESS) return 'completed';
    if (tx && order?.status === 'DELIVERED') return 'delivered';
    if (isAcceptingOrder && deliverTx) return 'delivering';
    if (tx && order?.status === 'READY_FOR_DELIVERY') return 'ready';
    if (tx && order?.status === 'IN_TRANSIT') return 'transit';
    if (pendingTx) return 'processing';
    if (mintedTx) return 'crafting';
  };

  const orderStatus = getOrderStatus();

  return (
    <>
      <header className={styles.hero}>
        <PizzaWorld className={styles.logo} />
      </header>

      {orderStatus && (
        <Stack margin="lg" justifyContent="center">
          <Surface>
            <Stack flexDirection="column" alignItems="center" width="100%">
              {orderStatus === 'ready' && (
                <Heading variant="h5" color="emphasize">
                  Your order is ready for delivery!
                </Heading>
              )}
              {orderStatus === 'delivered' && (
                <Heading variant="h5" color="emphasize">
                  <div>Enjoy your pizza!</div>
                </Heading>
              )}
              {orderStatus === 'completed' && (
                <Heading variant="h5" color="emphasize">
                  <div>Thank you for your order!</div>
                </Heading>
              )}
              {orderStatus === 'signing' && (
                <Heading variant="h5" color="emphasize">
                  <div>Signing for delivery...</div>
                </Heading>
              )}
              {orderStatus === 'crafting' && (
                <article>
                  <Heading variant="h5" color="emphasize">
                    We are crafting your pizza!
                  </Heading>
                  <PizzaLoader />
                </article>
              )}
              {orderStatus === 'processing' && (
                <Heading variant="h5" color="emphasize">
                  Your order is being processed.
                </Heading>
              )}

              {orderStatus === 'delivering' && (
                <Stack flexDirection="column" gap="xl">
                  <Heading variant="h5" color="emphasize">
                    Sign off to receive your pizza!
                  </Heading>
                  <Button onPress={onAcceptDelivery}>Sign off</Button>
                </Stack>
              )}

              {orderStatus === 'transit' && (
                <Heading variant="h5" color="emphasize">
                  Your pizza is on its way!
                </Heading>
              )}
            </Stack>
          </Surface>
        </Stack>
      )}
      {!tx && (
        <Stack justifyContent="flex-end">
          <Stack justifyContent="flex-end" gap="md" className={styles.account}>
            <AccountButton
              className={styles.button}
              user={account}
              returnPath="/v1/example/delivery"
              onLogout={logout}
            />
          </Stack>
        </Stack>
      )}
      {!tx && (
        <article className={styles.order}>
          <section>
            <h2>Delicious Pizzas Delivered Hot & Fresh</h2>
          </section>
          <section className={styles.deals}>
            <h3>Today's Specials</h3>
            <ul className={styles.list}>
              {products.map((product) => (
                <li key={product.name}>
                  <Product product={product} />
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h3>How It Works</h3>
            <ol>
              <li>Choose Your pizza</li>
              <li>Sign for your order</li>
              <li>We deliver</li>
              <li>Sign for your delivery</li>
            </ol>
          </section>
          <OrderSummary />
          <Stack gap="md" margin="md" flexDirection="column">
            <Button
              className={styles.button}
              onPress={onSend}
              isDisabled={!account && !orderItems.length}
            >
              Place your order
            </Button>
          </Stack>
        </article>
      )}
    </>
  );
}
