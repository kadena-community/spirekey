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
  Table,
  TableBody,
  TableHeader,
} from '@kadena/react-ui';
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
  const { orders, markOrderAsReady, saveDelivery } = useDelivery({
    chainId: process.env.CHAIN_ID!,
    networkId: process.env.NETWORK_ID!,
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
    if (isLoading) return;
    if (status !== SubmitStatus.SUBMITABLE) return;
    const originMsg = messages.find((m) => m.data.hash === tx.hash);
    doSubmit();
    if (!originMsg) return;
    send(originMsg.connectionId, { type: 'confirm', data: tx });
  }, [status, isLoading, messages]);
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
              .filter((m) => m.type === 'tx')
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
    </div>
  );
}
