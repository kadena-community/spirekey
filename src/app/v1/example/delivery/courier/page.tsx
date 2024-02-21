'use client';

import { AccountButton } from '@/components/AccountButton';
import { useReturnUrl } from '@/hooks/useReturnUrl';
import { getAccountFrom } from '@/utils/account';
import {
  Box,
  Button,
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
  maskValue,
} from '@kadena/react-ui';
import { ChainId } from '@kadena/types';
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

const CourierActionCell = ({
  transaction,
  onPickupDelivery,
  courier,
  buyer,
  orderId,
  status,
  merchant,
  onDeliver,
}: any) => {
  if (transaction && status === 'READY_FOR_DELIVERY')
    return <span>Pending approval from merchant</span>;
  if (!transaction && status === 'READY_FOR_DELIVERY')
    return (
      <Button
        onPress={onPickupDelivery({
          orderId,
          merchant,
        })}
      >
        Pickup
      </Button>
    );
  if (status === 'IN_TRANSIT')
    return (
      <Button
        onPress={onDeliver({
          buyer,
          orderId,
        })}
      >
        Deliver
      </Button>
    );
  return courier;
};

export default function CourierPage({ searchParams }: CourierProps) {
  const { user, transaction } = searchParams;
  const { account } = useLoggedInAccount(user);
  const { orders, saveDelivery, pickupDelivery, deliverOrder } = useDelivery({
    chainId: process.env.CHAIN_ID as ChainId,
    networkId: process.env.DAPP_NETWORK_ID!,
  });
  const { isLoading, messages, setId, connect, send } = useConnection();
  const router = useRouter();
  const { getReturnUrl } = useReturnUrl();

  useEffect(() => {
    if (!messages.length) return;
    messages
      .filter((m) => m.type === 'orders' && m.data?.orders?.length)
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
        networkId: process.env.DAPP_NETWORK_ID!,
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
        networkId: process.env.DAPP_NETWORK_ID!,
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
        <Table>
          <TableHeader>
            <Column>Order Id</Column>
            <Column>Buyer</Column>
            <Column>Order Price</Column>
            <Column>Delivery Price</Column>
            <Column>Courier</Column>
            <Column>Merchant</Column>
          </TableHeader>
          <TableBody>
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
                <Row key={orderId + status}>
                  <Cell>{maskValue(orderId)}</Cell>
                  <Cell>{maskValue(buyer)}</Cell>
                  <Cell>{orderPrice}</Cell>
                  <Cell>{deliveryPrice}</Cell>
                  <Cell>
                    <CourierActionCell
                      transaction={transaction}
                      onPickupDelivery={onPickupDelivery}
                      courier={courier}
                      buyer={buyer}
                      orderId={orderId}
                      status={status}
                      merchant={merchant}
                      onDeliver={onDeliver}
                    />
                  </Cell>
                  <Cell>{maskValue(merchant)}</Cell>
                </Row>
              ),
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
