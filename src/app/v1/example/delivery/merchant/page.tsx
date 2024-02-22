'use client';

import pizzaBackground from '@/app/v1/example/delivery/pizzabackground.jpg';
import { AccountButton } from '@/components/AccountButton';
import { Button } from '@/components/Button/Button';
import { AcceptOrder } from '@/components/Delivery/AcceptOrder/AcceptOrder';
import { PizzaWorld } from '@/components/icons/PizzaWorld';
import { useReturnUrl } from '@/hooks/useReturnUrl';
import { SubmitStatus, useSubmit } from '@/hooks/useSubmit';
import {
  Box,
  Cell,
  Column,
  Heading,
  Row,
  Stack,
  Table,
  TableBody,
  TableHeader,
  Text,
} from '@kadena/react-ui';
import { ChainId, ISigner } from '@kadena/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { Message } from '../Connection';
import { useConnection } from '../Connection';
import * as styles from '../order.css';
import { useDelivery } from '../useDelivery';
import { useLoggedInAccount } from '../useLoggedInAccount';

type MerchantProps = {
  searchParams: {
    user: string;
    transaction: string;
  };
};

export default function MerchantPage({ searchParams }: MerchantProps) {
  const { user } = searchParams;
  const { account, logout } = useLoggedInAccount(user);
  const { setId, send, isLoading, messages } = useConnection();
  const { getReturnUrl } = useReturnUrl();
  const router = useRouter();

  const { status, doSubmit, tx } = useSubmit(searchParams);
  const { orders, markOrderAsReady, saveDelivery, updateOrders } = useDelivery({
    chainId: process.env.CHAIN_ID as ChainId,
    networkId: process.env.DAPP_NETWORK_ID!,
  });
  const markAsReady = (orderId: string) => async () => {
    if (!account) return;
    const tx = await markOrderAsReady({
      orderId,
      merchantAccount: account?.accountName,
      merchantPublicKey: account?.credentials[0].publicKey,
    });
    router.push(
      `${process.env.WALLET_URL}/sign?transaction=${Buffer.from(
        JSON.stringify(tx),
      ).toString('base64')}&returnUrl=${getReturnUrl(
        '/v1/example/delivery/merchant',
      )}`,
    );
  };

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
    if (originMsg.orderId) saveDelivery(originMsg.orderId);
    doSubmit();
    send(originMsg.connectionId, { type: 'confirm', data: tx });
  }, [status, isLoading, messages]);

  console.log(orders);
  // const pendingOrders = orders;
  const pendingOrders = orders?.filter((order) => order.status === 'CREATED');

  const newOrders = messages.filter((message) => message.type === 'create');

  return (
    <div>
      <style jsx global>
        {`
          body {
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-image: url(${pizzaBackground.src});
            background-color: rgba(0, 0, 0, 0.8);
            background-blend-mode: saturation;
          }
        `}
      </style>
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
            onLogout={logout}
          />
        </Stack>
      </Stack>

      {account && (
        <>
          {newOrders.length > 0 && (
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
              {newOrders.map((newOrder) => (
                <AcceptOrder
                  key={newOrder.data.hash + newOrder.type}
                  signers={JSON.parse(newOrder.data.cmd).signers as ISigner[]}
                  signingLink={`${process.env.WALLET_URL}/sign?transaction=${Buffer.from(
                    JSON.stringify(newOrder.data),
                  ).toString('base64')}&returnUrl=${getReturnUrl(
                    '/v1/example/delivery/merchant',
                  )}`}
                />
              ))}
            </Stack>
          )}
          {newOrders.length === 0 && (
            <Stack marginBlock="xl" justifyContent="center">
              <Heading variant="h5" as="h3">
                No new orders to accept
              </Heading>
            </Stack>
          )}
          <Table>
            <TableHeader>
              <Column>Type</Column>
              <Column>Transaction Hash</Column>
              <Column>Action</Column>
            </TableHeader>
            <TableBody>
              {Array.from(
                messages
                  .filter((m) => m.type === 'tx' || m.type === 'create')
                  .reduce((s, m) => {
                    s.set(m.data.hash, m);
                    return s;
                  }, new Map<string, Message>())
                  .values(),
              ).map((message, index) => (
                <Row key={message.data.hash + message.type}>
                  <Cell>{message.type}</Cell>
                  <Cell>{message.data.hash}</Cell>
                  <Cell>
                    <Link
                      href={`${process.env.WALLET_URL}/sign?transaction=${Buffer.from(
                        JSON.stringify(message.data),
                      ).toString('base64')}&returnUrl=${getReturnUrl(
                        '/v1/example/delivery/merchant',
                      )}`}
                    >
                      sign
                    </Link>
                  </Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
          {!!pendingOrders?.length && (
            <Stack margin="md" gap="md" flexDirection="column">
              <h2>Pending Orders</h2>
              <Table>
                <TableHeader>
                  <Column>Order Id</Column>
                  {/* <Column>Status</Column> */}
                  <Column>Buyer</Column>
                  <Column>Order Price</Column>
                  <Column>Delivery Price</Column>
                  <Column>Courier</Column>
                  <Column>Merchant</Column>
                  <Column>Action</Column>
                </TableHeader>
                <TableBody>
                  {pendingOrders.map((order) => (
                    <Row key={order.orderId}>
                      <Cell>{order.orderId}</Cell>
                      {/* <Cell>{order.status}</Cell> */}
                      <Cell>{order.buyer}</Cell>
                      <Cell>{order.orderPrice}</Cell>
                      <Cell>{order.deliveryPrice}</Cell>
                      <Cell>{order.courier}</Cell>
                      <Cell>{order.merchant}</Cell>
                      <Cell>
                        <Button onPress={markAsReady(order.orderId)}>
                          Mark as Ready
                        </Button>
                      </Cell>
                    </Row>
                  ))}
                </TableBody>
              </Table>
            </Stack>
          )}
        </>
      )}
    </div>
  );
}
