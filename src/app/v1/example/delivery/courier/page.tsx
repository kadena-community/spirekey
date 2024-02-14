'use client';

import { AccountButton } from '@/components/AccountButton';
import { Box, Table, maskValue } from '@kadena/react-ui';
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
  const { orders, saveDelivery } = useDelivery({
    chainId: process.env.CHAIN_ID!,
    networkId: process.env.NETWORK_ID!,
  });
  const { isLoading, messages, setId, connect, send } = useConnection();

  useEffect(() => {
    if (!messages.length) return;
    messages
      .filter((m) => m.type === 'orders')
      .flatMap((m) =>
        m.data.orders.map((order: any) => saveDelivery(order.orderId)),
      );
  }, [messages]);
  useEffect(() => {
    if (isLoading) return;
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
      {!!orders?.length && (
        <Table.Root>
          <Table.Head>
            <Table.Tr>
              <Table.Th>Order Id</Table.Th>
              <Table.Th>Buyer</Table.Th>
              <Table.Th>Order Price</Table.Th>
              <Table.Th>Delivery Price</Table.Th>
              <Table.Th>Courier</Table.Th>
              <Table.Th>Merchant</Table.Th>
            </Table.Tr>
          </Table.Head>
          <Table.Body>
            {orders.map(
              ({
                orderId,
                buyer,
                merchant,
                courier,
                deliveryPrice,
                orderPrice,
              }) => (
                <Table.Tr key={orderId}>
                  <Table.Td>{maskValue(orderId)}</Table.Td>
                  <Table.Td>{maskValue(buyer)}</Table.Td>
                  <Table.Td>{orderPrice}</Table.Td>
                  <Table.Td>{deliveryPrice}</Table.Td>
                  <Table.Td>{courier}</Table.Td>
                  <Table.Td>{maskValue(merchant)}</Table.Td>
                </Table.Tr>
              ),
            )}
          </Table.Body>
        </Table.Root>
      )}
    </div>
  );
}
