'use client';

import { AccountButton } from '@/components/AccountButton';
import { useReturnUrl } from '@/hooks/useReturnUrl';
import { getAccountFrom } from '@/utils/account';
import { Box, Button, Table, maskValue } from '@kadena/react-ui';
import { useRouter } from 'next/navigation';
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
  const { user, transaction } = searchParams;
  const { account } = useLoggedInAccount(user);
  const { orders, saveDelivery, pickupDelivery, deliverOrder } = useDelivery({
    chainId: process.env.CHAIN_ID!,
    networkId: process.env.NETWORK_ID!,
  });
  const { isLoading, messages, setId, connect, send } = useConnection();
  const router = useRouter();
  const { getReturnUrl } = useReturnUrl();

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

  const onPickupDelivery =
    ({ merchant, orderId }: { merchant: string; orderId: string }) =>
    async () => {
      if (!account) return;
      const merchantAcc = await getAccountFrom({
        caccount: merchant,
        networkId: process.env.NETWORK_ID!,
      });
      const tx = await pickupDelivery({
        orderId,
        merchantPublicKey: merchantAcc?.devices[0].guard.keys[0],
        courierAccount: account.accountName,
        courierPublicKey: account.credentials[0].publicKey,
      });
      router.push(
        `${process.env.WALLET_URL}/sign?transaction=${Buffer.from(
          JSON.stringify(tx),
        ).toString('base64')}&returnUrl=${getReturnUrl(
          '/v1/example/delivery/courier',
        )}`,
      );
    };

  const onDeliver =
    ({ buyer, orderId }: { buyer: string; orderId: string }) =>
    async () => {
      if (!account) return;
      const buyerAccount = await getAccountFrom({
        caccount: buyer,
        networkId: process.env.NETWORK_ID!,
      });
      const tx = await deliverOrder({
        orderId,
        buyerAccount: buyer,
        buyerPublicKey: buyerAccount?.devices[0].guard.keys[0],
        courierPublicKey: account.credentials[0].publicKey,
      });
      router.push(
        `${process.env.WALLET_URL}/sign?transaction=${Buffer.from(
          JSON.stringify(tx),
        ).toString('base64')}&returnUrl=${getReturnUrl(
          '/v1/example/delivery/courier',
        )}`,
      );
    };

  useEffect(() => {
    if (!account?.accountName) return;
    if (isLoading) return;
    if (!transaction) return;
    const tx = JSON.parse(Buffer.from(transaction, 'base64').toString());
    const cmd = JSON.parse(tx.cmd);
    if (cmd.meta.sender !== account.accountName) {
      send(
        {
          id: '1234',
          publicKey: cmd.meta.sender,
        },
        {
          type: 'tx',
          data: tx,
        },
      );
    } else {
      send(
        {
          id: '1234',
          publicKey: 'c:-BtZKCieonbuxQHJocDqdUXMZgHwN4XDNQjXXSaTJDo',
        },
        {
          type: 'tx',
          data: tx,
        },
      );
    }
  }, [isLoading, transaction, account?.accountName]);

  return (
    <div>
      <Box margin="md">
        <h1>Delivery Page</h1>
        <AccountButton
          user={account}
          returnPath="/v1/example/delivery/courier"
        />
      </Box>
      {account && !!orders?.length && (
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
                status,
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
                  <Table.Td>
                    {transaction &&
                      status === 'READY_FOR_DELIVERY' &&
                      'Pending approval from merchant'}
                    {!transaction && status === 'READY_FOR_DELIVERY' && (
                      <Button
                        onPress={onPickupDelivery({
                          orderId,
                          merchant,
                        })}
                      >
                        Pickup
                      </Button>
                    )}
                    {(status === 'READY_FOR_DELIVERY' ||
                      status === 'CREATED') &&
                      courier}
                    {status === 'IN_TRANSIT' && (
                      <Button
                        onPress={onDeliver({
                          buyer,
                          orderId,
                        })}
                      >
                        Deliver
                      </Button>
                    )}
                  </Table.Td>
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
