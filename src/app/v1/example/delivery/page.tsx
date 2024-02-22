'use client';

import pizzaBackground from '@/app/v1/example/delivery/pizzabackground.jpg';
import { AccountButton } from '@/components/AccountButton';
import { Button } from '@/components/Button/Button';
import { OrderSummary } from '@/components/Delivery/OrderSummary/OrderSummary';
import { Product } from '@/components/Delivery/Product/Product';
import { PizzaLoader } from '@/components/PizzaLoader/PizzaLoader';
import { PizzaWorld } from '@/components/icons/PizzaWorld';
import { useOrder } from '@/context/OrderContext';
import { useReturnUrl } from '@/hooks/useReturnUrl';
import { SubmitStatus, useSubmit } from '@/hooks/useSubmit';
import { getAccountFrom } from '@/utils/account';
import { getDevnetNetworkId } from '@/utils/getDevnetNetworkId';
import { Box, Stack } from '@kadena/react-ui';
import { ChainId } from '@kadena/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useConnection } from './Connection';
import * as styles from './order.css';
import { createOrderId, useDelivery } from './useDelivery';
import { useLoggedInAccount } from './useLoggedInAccount';

type DeliveryProps = {
  searchParams: {
    user: string;
    transaction: string;
  };
};

export default function DeliveryPage({ searchParams }: DeliveryProps) {
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
  const { products, orderItems, orderTotalPrice } = useOrder();

  const merchantAccount = process.env.MERCHANT_ACCOUNT;

  if (!merchantAccount) {
    throw new Error('Merchant account is not configured.');
  }

  const { register, getValues, watch } = useForm({
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
      orderItems,
    });
    const orderId = createOrderId({
      customer: account.accountName,
      merchant: merchantAccount,
      orderId: id,
    });
    saveDelivery(orderId);
    router.push(
      `${process.env.WALLET_URL}/sign?transaction=${Buffer.from(
        JSON.stringify(tx),
      ).toString('base64')}&returnUrl=${getReturnUrl('/v1/example/delivery')}`,
    );
  };

  const deliverTx = [...messages].find((m) => m.type === 'tx');
  const onAcceptDelivery = async () => {
    if (!deliverTx) return;
    router.push(
      `${process.env.WALLET_URL}/sign?transaction=${Buffer.from(
        JSON.stringify(deliverTx.data),
      ).toString('base64')}&returnUrl=${getReturnUrl('/v1/example/delivery')}`,
    );
  };

  useEffect(() => {
    if (!merchantAccount) return;
    const fetchMerchantAccount = async () => {
      const remoteMerchantAccount = await getAccountFrom({
        networkId: process.env.NETWORK_ID || getDevnetNetworkId(),
        accountName: merchantAccount,
      });
      setMerchantPublicKey(remoteMerchantAccount.devices[0].guard.keys[0]);
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
    if (!orderId) return;
    send(
      { id: '1234', publicKey: getValues('receiver') },
      { type: 'create', data: tx, orderId },
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

  if (
    orders?.find((o) => o.orderId === localStorage.getItem('newOrderId'))
      ?.status === 'DELIVERED' &&
    tx
  )
    return (
      <Box margin="md">
        <div>Enjoy your pizza!</div>
      </Box>
    );

  if (status === SubmitStatus.SUCCESS)
    return (
      <Box margin="md">
        <div>Enjoy your pizza!</div>
      </Box>
    );
  if (status === SubmitStatus.LOADING)
    return (
      <Box margin="md">
        <div>Signing off...</div>
      </Box>
    );

  return (
    <div>
      <style jsx global>
        {`
          body {
            background-color: #000;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-image: url(${pizzaBackground.src});
          }
        `}
      </style>
      <header className={styles.hero}>
        <PizzaWorld className={styles.logo} />
      </header>
      {mintedTx && (
        <article className={styles.loadingWrapper}>
          <h2>We are crafting your pizza!</h2>
          <PizzaLoader />
        </article>
      )}
      {pendingTx && <Box margin="md">Your order is being processed.</Box>}
      {isAcceptingOrder && deliverTx && (
        <Box margin="md">
          Sign off to receive your pizza!
          <Button onPress={onAcceptDelivery}>Sign off</Button>
        </Box>
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
              isDisabled={!account || orderItems.length === 0}
            >
              Place your order
            </Button>
          </Stack>
        </article>
      )}
    </div>
  );
}
