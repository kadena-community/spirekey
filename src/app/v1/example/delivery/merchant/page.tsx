'use client';

import { AccountButton } from '@/components/AccountButton';
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

  const { status, doSubmit, tx } = useSubmit(searchParams);
  const { orders, saveDelivery } = useDelivery({
    chainId: process.env.CHAIN_ID!,
    networkId: process.env.NETWORK_ID!,
  });

  useEffect(() => {
    if (!account?.accountName) return;
    setId({ id: '1234', publicKey: account?.accountName });
  }, []);

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
