'use client';

import { AccountButton } from '@/components/AccountButton';
import { Box } from '@kadena/react-ui';
import { useEffect } from 'react';
import { useConnection } from '../Connection';
import { useDelivery } from '../useDelivery';
import { useLoggedInAccount } from '../useLoggedInAccount';

type CourierProps = {
  searchParams: {
    user: string;
    transaction: string;
  };
};

export default function CourierPage({ searchParams }: CourierProps) {
  const { user } = searchParams;
  const { account } = useLoggedInAccount(user);
  const { orders } = useDelivery({
    chainId: process.env.CHAIN_ID!,
    networkId: process.env.NETWORK_ID!,
  });
  const { isLoading, messages, setId, connect, send } = useConnection();

  useEffect(() => {
    if (!account?.accountName) return;
    setId({ id: '1234', publicKey: account?.accountName });
  }, [account?.accountName, isLoading]);
  useEffect(() => {
    if (!account?.accountName) return;
    if (isLoading) return;
    send(
      {
        id: '1234',
        publicKey: 'c:-BtZKCieonbuxQHJocDqdUXMZgHwN4XDNQjXXSaTJDo',
      },
      {
        type: 'id',
        data: {
          id: '1234',
          publicKey: account?.accountName,
        },
      },
    );
  }, [account?.accountName, isLoading]);

  return (
    <div>
      <Box margin="md">
        <h1>Delivery Page</h1>
        <AccountButton
          user={account}
          returnPath="/v1/example/delivery/courier"
        />
      </Box>
      {JSON.stringify(messages)}
    </div>
  );
}
