'use client';

import { AccountButton } from '@/components/AccountButton';
import { AcceptOrder } from '@/components/Delivery/AcceptOrder/AcceptOrder';
import { AcceptedOrder } from '@/components/Delivery/AcceptedOrder/AcceptedOrder';
import { OrderDelivery } from '@/components/Delivery/OrderDelivery/OrderDelivery';
import { ReadyForDelivery } from '@/components/Delivery/ReadyForDelivery/ReadyForDelivery';
import { PizzaWorld } from '@/components/icons/PizzaWorld';
import { OrderProvider } from '@/context/OrderContext';
import { useReturnUrl } from '@/hooks/useReturnUrl';
import { SubmitStatus, useSubmit } from '@/hooks/useSubmit';
import { getSmartContractMeta } from '@/utils/smartContractMeta';
import { Box, Heading, Stack, Text } from '@kadena/react-ui';
import { ChainId, ISigner } from '@kadena/types';
import { useEffect } from 'react';
import { useConnection } from '../Connection';
import * as styles from '../order.css';
import { useDelivery } from '../useDelivery';
import { useLoggedInAccount } from '../useLoggedInAccount';
import './page.css';

type MerchantProps = {
  searchParams: {
    user: string;
    transaction: string;
  };
};

export default function MerchantPage({ searchParams }: MerchantProps) {
  const { user } = searchParams;
  const { account } = useLoggedInAccount(user);
  const { setId, send, isLoading, messages } = useConnection();
  const { getReturnUrl } = useReturnUrl();

  const { status, doSubmit, tx } = useSubmit(searchParams);
  const { orders, saveDelivery, updateOrders } = useDelivery({
    chainId: process.env.CHAIN_ID as ChainId,
    networkId: process.env.DAPP_NETWORK_ID!,
  });

  const couriers = Array.from(
    new Map(
      messages
        .filter((m) => m.type === 'id')
        .map((m) => [m.data.id + m.data.publicKey, m]),
    ).values(),
  );
  useEffect(() => {
    if (isLoading) return;
    if (!couriers) return;
    couriers.map((courier) =>
      send(courier.connectionId, { type: 'orders', data: { orders } }),
    );
  }, [isLoading, couriers, orders]);

  useEffect(() => {
    if (isLoading) return;
    if (!account?.accountName) return;
    setId({ id: '1234', publicKey: account?.accountName });
  }, [account?.accountName, isLoading]);

  useEffect(() => {
    if (status !== SubmitStatus.SUCCESS) return;
    updateOrders();
  }, [status]);

  useEffect(() => {
    if (isLoading) return;
    if (status !== SubmitStatus.SUBMITABLE) return;
    const originMsg = messages.find((m) => m.data.hash === tx.hash);
    if (!originMsg) {
      doSubmit();
      return;
    }
    if (originMsg.orderId)
      saveDelivery(originMsg.orderId, originMsg.customTranslations);
    doSubmit();
    send(originMsg.connectionId, { type: 'confirm', data: tx });
  }, [status, isLoading, messages]);

  const transactionsToSign = messages
    .filter(
      (message) =>
        message.type === 'tx' &&
        message.data.cmd.includes('delivery.PICKUP_DELIVER'),
    )
    .map((transactionToSign) => transactionToSign.data);

  const deliveredOrders =
    orders?.filter((order) => order.status === 'DELIVERED') || [];

  const transitOrders =
    orders?.filter((order) => order.status === 'IN_TRANSIT') || [];

  const readyOrders =
    orders?.filter((order) => order.status === 'READY_FOR_DELIVERY') || [];

  const notReadyOrders =
    orders?.filter((order) => order.status === 'CREATED') || [];

  const newOrders = messages.filter((message) => message.type === 'create');
  const acceptedOrderIds =
    orders?.map((acceptedOrder) => acceptedOrder.orderId) || [];
  const newOrdersToAccept = newOrders.filter(
    (newOrder) => !acceptedOrderIds.includes(newOrder.orderId || ''),
  );

  return (
    <OrderProvider>
      <Stack className={styles.hero} flexDirection="column">
        <Box textAlign="right">
          <PizzaWorld className={styles.logo} />
          <Text
            variant="small"
            style={{
              fontWeight: 'bold',
              marginBlockStart: '-0.25rem',
              display: 'block',
            }}
          >
            Management dashboard
          </Text>
        </Box>
      </Stack>

      <Stack justifyContent="flex-end" marginBlockEnd="md">
        <Stack justifyContent="flex-end" gap="md" className={styles.account}>
          <AccountButton
            className={styles.button}
            user={account}
            returnPath="/v1/example/delivery/merchant"
          />
        </Stack>
      </Stack>

      {account && (
        <>
          {!!deliveredOrders?.length && (
            <Stack
              flexDirection="column"
              paddingInline="lg"
              marginBlockEnd="xl"
              gap="md"
            >
              <Stack marginBlock="xl" justifyContent="center">
                <Heading variant="h5" as="h3">
                  Completed orders
                </Heading>
              </Stack>
              {deliveredOrders.map((deliveredOrder) => {
                const orderTransaction = newOrders.find(
                  (newOrder) => newOrder.orderId === deliveredOrder.orderId,
                );
                return (
                  <OrderDelivery
                    key={`${orderTransaction?.data.hash}-transit`}
                    signers={
                      JSON.parse(orderTransaction?.data.cmd || '{}')
                        .signers as ISigner[]
                    }
                    transaction={transactionsToSign.find((t) =>
                      t.cmd.includes(deliveredOrder.orderId),
                    )}
                    order={deliveredOrder}
                  />
                );
              })}
            </Stack>
          )}
          {!deliveredOrders?.length && (
            <Stack marginBlock="xl" justifyContent="center">
              <Heading variant="h5" as="h3">
                No pizzas delivered
              </Heading>
            </Stack>
          )}

          {!!transitOrders?.length && (
            <Stack
              flexDirection="column"
              paddingInline="lg"
              marginBlockEnd="xl"
              gap="md"
            >
              <Stack marginBlock="xl" justifyContent="center">
                <Heading variant="h5" as="h3">
                  Deliveries in progress
                </Heading>
              </Stack>
              {transitOrders.map((transitOrder) => {
                const orderTransaction = newOrders.find(
                  (newOrder) => newOrder.orderId === transitOrder.orderId,
                );
                return (
                  <OrderDelivery
                    key={`${orderTransaction?.data.hash}-transit`}
                    signers={
                      JSON.parse(orderTransaction?.data.cmd || '{}')
                        .signers as ISigner[]
                    }
                    transaction={transactionsToSign.find((t) =>
                      t.cmd.includes(transitOrder.orderId),
                    )}
                    order={transitOrder}
                  />
                );
              })}
            </Stack>
          )}
          {!transitOrders?.length && (
            <Stack marginBlock="xl" justifyContent="center">
              <Heading variant="h5" as="h3">
                No deliveries in progress
              </Heading>
            </Stack>
          )}

          {!!readyOrders?.length && (
            <Stack
              flexDirection="column"
              paddingInline="lg"
              marginBlockEnd="xl"
              gap="md"
            >
              <Stack marginBlock="xl" justifyContent="center">
                <Heading variant="h5" as="h3">
                  Ready for delivery
                </Heading>
              </Stack>
              {readyOrders.map((readyOrder) => {
                const orderTransaction = newOrders.find(
                  (newOrder) => newOrder.orderId === readyOrder.orderId,
                );
                return (
                  <ReadyForDelivery
                    key={`${orderTransaction?.data.hash}-accepted`}
                    signers={
                      JSON.parse(orderTransaction?.data.cmd || '{}')
                        .signers as ISigner[]
                    }
                    transaction={transactionsToSign.find((t) =>
                      t.cmd.includes(readyOrder.orderId),
                    )}
                    order={readyOrder}
                  />
                );
              })}
            </Stack>
          )}
          {!readyOrders?.length && (
            <Stack marginBlock="xl" justifyContent="center">
              <Heading variant="h5" as="h3">
                No orders ready for delivery
              </Heading>
            </Stack>
          )}

          {!!notReadyOrders?.length && (
            <Stack
              flexDirection="column"
              paddingInline="lg"
              marginBlockEnd="xl"
              gap="md"
            >
              <Stack marginBlock="xl" justifyContent="center">
                <Heading variant="h5" as="h3">
                  Accepted orders
                </Heading>
              </Stack>
              {notReadyOrders.map((notReadyOrder) => {
                const orderTransaction = newOrders.find(
                  (newOrder) => newOrder.orderId === notReadyOrder.orderId,
                );
                return (
                  <AcceptedOrder
                    key={`${orderTransaction?.data.hash}-accepted`}
                    signers={
                      JSON.parse(orderTransaction?.data.cmd || '{}')
                        .signers as ISigner[]
                    }
                    orderId={notReadyOrder.orderId}
                  />
                );
              })}
            </Stack>
          )}
          {!notReadyOrders?.length && (
            <Stack marginBlock="xl" justifyContent="center">
              <Heading variant="h5" as="h3">
                No orders in progress
              </Heading>
            </Stack>
          )}

          {!!newOrdersToAccept.length && (
            <Stack
              flexDirection="column"
              paddingInline="lg"
              marginBlockEnd="xl"
              gap="md"
            >
              <Stack marginBlock="xl" justifyContent="center">
                <Heading variant="h5" as="h3">
                  New orders
                </Heading>
              </Stack>
              {newOrdersToAccept.map((newOrder) => (
                <AcceptOrder
                  key={newOrder.data.hash + newOrder.type}
                  order={newOrder}
                  signers={JSON.parse(newOrder.data.cmd).signers as ISigner[]}
                  signingLink={`${process.env.WALLET_URL}/sign?transaction=${Buffer.from(
                    JSON.stringify(newOrder.data),
                  ).toString('base64')}&returnUrl=${getReturnUrl(
                    '/v1/example/delivery/merchant',
                  )}&meta=${Buffer.from(
                    JSON.stringify(getSmartContractMeta()),
                  ).toString('base64')}`}
                  account={account}
                />
              ))}
            </Stack>
          )}
          {!newOrdersToAccept.length && (
            <Stack marginBlock="xl" justifyContent="center">
              <Heading variant="h5" as="h3">
                No new orders to accept
              </Heading>
            </Stack>
          )}
        </>
      )}
    </OrderProvider>
  );
}
