'use client';

import { Account } from '@/components/Account';
import { useReturnUrl } from '@/hooks/useReturnUrl';
import { decodeAccount } from '@/utils/decodeAccount';
import { Box, Table } from '@kadena/react-ui';
import Link from 'next/link';
import { useEffect } from 'react';
import type { Message } from '../Connection';
import { useConnection } from '../Connection';

type MerchantProps = {
  searchParams: {
    response: string;
    payload: string;
  };
};

export default function MerchantPage({ searchParams }: MerchantProps) {
  const { response } = searchParams;
  const account = decodeAccount(response);
  const { connect, setId, send, isLoading, messages } = useConnection();
  const { getReturnUrl } = useReturnUrl();

  useEffect(() => {
    if (!account?.accountName) return;
    setId({ id: '1234', publicKey: account?.accountName });
  }, []);
  return (
    <div>
      <Box margin="md">
        <h1>Merchant Page</h1>
        <Account account={account} returnPath="/v1/example/delivery" />
      </Box>
      <Table.Root>
        <Table.Body>
          {Array.from(
            messages
              .reduce((s, m) => {
                s.add(m);
                return s;
              }, new Set<Message>())
              .values(),
          ).map((message, index) => (
            <Table.Tr key={index}>
              <Table.Td>{message.type}</Table.Td>
              <Table.Td>{message.data.hash}</Table.Td>
              <Table.Td>
                <Link
                  href={`${process.env.WALLET_URL}/sign?payload=${Buffer.from(
                    JSON.stringify(message.data),
                  ).toString(
                    'base64',
                  )}&cid=${account.cid}&returnUrl=${getReturnUrl(
                    '/v1/example/delivery/merchant',
                  )}`}
                >
                  sign
                </Link>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
