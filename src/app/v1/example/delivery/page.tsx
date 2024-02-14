'use client';

import { AccountButton } from '@/components/AccountButton';
import { Button } from '@/components/Button/Button';
import { useReturnUrl } from '@/hooks/useReturnUrl';
import { useSubmit } from '@/hooks/useSubmit';
import { Box, Stack, Text, TextField } from '@kadena/react-ui';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useConnection } from './Connection';
import pizza from './pizza.png';
import { useDelivery } from './useDelivery';
import { useLoggedInAccount } from './useLoggedInAccount';

type DeliveryProps = {
  searchParams: {
    user: string;
    transaction: string;
  };
};

const price = 2.55;
export default function DeliveryPage({ searchParams }: DeliveryProps) {
  const { user } = searchParams;
  const { tx } = useSubmit(searchParams);
  const { account } = useLoggedInAccount(user);
  const { messages, setId, send, isLoading } = useConnection();
  const { getReturnUrl } = useReturnUrl();
  const { orders, createOrder } = useDelivery({
    chainId: process.env.CHAIN_ID!,
    networkId: process.env.NETWORK_ID!,
  });

  const router = useRouter();
  const { register, getValues, watch } = useForm({
    defaultValues: {
      receiver: 'c:-BtZKCieonbuxQHJocDqdUXMZgHwN4XDNQjXXSaTJDo',
      amount: 1,
    },
    reValidateMode: 'onChange',
  });

  const onSend = async () => {
    if (!account) return;
    const tx = await createOrder({
      customerAccount: account.accountName,
      customerPublicKey: account.credentials[0].publicKey,
      merchantAccount: 'c:-BtZKCieonbuxQHJocDqdUXMZgHwN4XDNQjXXSaTJDo',
      merchantPublicKey:
        'WEBAUTHN-a5010203262001215820c4518d145cd1ca74d6371dfd24fec692d770ef13335e299533e0cf2bd11286a2225820b956dd1d7d48d3bb4e3a47c0a1cd70c7e3751f0e3fabf50c58ab22fc07033950',
      deliveryPrice: 3.25,
      orderPrice: getValues('amount') * price,
      orderId: '2',
    });
    router.push(
      `${process.env.WALLET_URL}/sign?transaction=${Buffer.from(
        JSON.stringify(tx),
      ).toString('base64')}&returnUrl=${getReturnUrl('/v1/example/delivery')}`,
    );
  };

  useEffect(() => {
    if (!account?.accountName) return;
    setId({ id: '1234', publicKey: account?.accountName });
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;
    if (!tx) return;
    send(
      { id: '1234', publicKey: getValues('receiver') },
      { type: 'tx', data: tx },
    );
  }, [tx, isLoading]);
  const pendingTx = tx && !messages.some((m) => m.data.hash === tx.hash);
  const mintedTx = tx && messages.some((m) => m.data.hash === tx.hash);
  return (
    <div>
      <Box margin="md">
        <h1>Delivery Page</h1>
        <AccountButton user={account} returnPath="/v1/example/delivery" />
      </Box>
      {pendingTx && <Box margin="md">Order pending...</Box>}
      {mintedTx && <Box margin="md">Your pizza is on the way!</Box>}
      {!tx && (
        <Stack gap="md" margin="md" flexDirection="column">
          <Box margin="md">
            <Image src={pizza} alt="pizza" width={100} height={100} />
          </Box>
          <TextField
            defaultValue="1"
            {...register('amount', {
              valueAsNumber: true,
              min: 1,
            })}
            label="Amount of slices"
            type="number"
          />
          <Text>Price: {watch('amount') * price}</Text>
          <Button onPress={onSend}>order</Button>
        </Stack>
      )}
    </div>
  );
}
