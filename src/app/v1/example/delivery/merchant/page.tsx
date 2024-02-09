'use client';

import { Account } from '@/components/Account';
import { decodeAccount } from '@/utils/decodeAccount';
import { Table } from '@kadena/react-ui';
import { useEffect } from 'react';
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

  useEffect(() => {
    if (!account?.accountName) return;
    setId({ id: '1234', publicKey: account?.accountName });
  }, []);
  return (
    <div>
      <h1>Merchant Page</h1>
      <Account account={account} returnPath="/v1/example/delivery" />
      <Table.Root>
        <Table.Body>
          {messages.map((message, index) => (
            <Table.Tr key={index}>
              <Table.Td>{message.type}</Table.Td>
              <Table.Td>{message.data.hash}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
