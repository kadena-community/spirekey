'use client';

import { AccountButton } from '@/components/AccountButton';
import { Button } from '@/components/Button/Button';
import { useReturnUrl } from '@/hooks/useReturnUrl';
import { SubmitStatus, useSubmit } from '@/hooks/useSubmit';
import {
  Box,
  Cell,
  Column,
  Row,
  Stack,
  Table,
  TableBody,
  TableHeader,
} from '@kadena/react-ui';
import { ChainId } from '@kadena/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { Message } from '../Connection';
import { useConnection } from '../Connection';
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
  const { account } = useLoggedInAccount(user);
  const { setId, send, isLoading, messages } = useConnection();
  const { getReturnUrl } = useReturnUrl();
  const router = useRouter();

  const { status, doSubmit, tx } = useSubmit(searchParams);
  const { orders, markOrderAsReady, saveDelivery, refreshOrders } = useDelivery(
    {
      chainId: process.env.CHAIN_ID as ChainId,
      networkId: process.env.NETWORK_ID!,
    },
  );
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
    refreshOrders();
  }, [status, isLoading, messages]);
  const pendingOrders = orders?.filter((order) => order.status === 'CREATED');
  return (
    <div>
      <Box margin="md">
        <h1>Merchant Page</h1>
        <AccountButton
          user={account}
          returnPath="/v1/example/delivery/merchant"
        />
      </Box>
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
    </div>
  );
}
