'use client';

import { AccountButton } from '@/components/AccountButton';
import { Button } from '@/components/Button/Button';
import { useReturnUrl } from '@/hooks/useReturnUrl';
import { SubmitStatus, useSubmit } from '@/hooks/useSubmit';
import { Box, Stack, Text, TextField } from '@kadena/react-ui';
import { ChainId } from '@kadena/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useConnection } from './Connection';
import pizza from './pizza.png';
import { createOrderId, useDelivery } from './useDelivery';
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
  const { orders, createOrder, saveDelivery } = useDelivery({
    chainId: process.env.CHAIN_ID as ChainId,
    networkId: process.env.NETWORK_ID!,
  });
  const { status, doSubmit } = useSubmit(searchParams);

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
    const id = Date.now().toString();
    const tx = await createOrder({
      customerAccount: account.accountName,
      customerPublicKey: account.credentials[0].publicKey,
      merchantAccount: 'c:-BtZKCieonbuxQHJocDqdUXMZgHwN4XDNQjXXSaTJDo',
      merchantPublicKey:
        'WEBAUTHN-a5010203262001215820c4518d145cd1ca74d6371dfd24fec692d770ef13335e299533e0cf2bd11286a2225820b956dd1d7d48d3bb4e3a47c0a1cd70c7e3751f0e3fabf50c58ab22fc07033950',
      deliveryPrice: 3.25,
      orderPrice: getValues('amount') * price,
      orderId: id,
    });
    const orderId = createOrderId({
      customer: account.accountName,
      merchant: 'c:-BtZKCieonbuxQHJocDqdUXMZgHwN4XDNQjXXSaTJDo',
      orderId: id,
    });
    saveDelivery(orderId);
    router.push(
      `${process.env.WALLET_URL}/sign?transaction=${Buffer.from(
        JSON.stringify(tx),
      ).toString('base64')}&returnUrl=${getReturnUrl('/v1/example/delivery')}`,
    );
  };

  const deliverTx = [...messages].reverse().find((m) => m.type === 'tx');
  const onAcceptDelivery = async () => {
    if (!deliverTx) return;
    router.push(
      `${process.env.WALLET_URL}/sign?transaction=${Buffer.from(
        JSON.stringify(deliverTx.data),
      ).toString('base64')}&returnUrl=${getReturnUrl('/v1/example/delivery')}`,
    );
  };

  useEffect(() => {
    if (isLoading) return;
    if (!account?.accountName) return;
    setId({ id: '1234', publicKey: account?.accountName });
  }, [account?.accountName, isLoading]);

  useEffect(() => {
    if (isLoading) return;
    if (!tx) return;
    if (deliverTx) return;
    const orderId = localStorage.getItem('newOrderId');
    if (!orderId) return;
    send(
      { id: '1234', publicKey: getValues('receiver') },
      { type: 'create', data: tx, orderId },
    );
  }, [tx, isLoading, deliverTx]);

  const isAcceptingOrder = tx && deliverTx?.data?.hash !== tx.hash;

  useEffect(() => {
    if (isLoading) return;
    if (status !== SubmitStatus.SUBMITABLE) return;
    if (isAcceptingOrder) return;
    doSubmit();
  }, [tx, isLoading, deliverTx, status]);

  const pendingTx = tx && !messages.some((m) => m.data.hash === tx.hash);
  const mintedTx = tx && messages.some((m) => m.data.hash === tx.hash);

  if (
    orders?.find((o) => o.orderId === localStorage.getItem('newOrderId'))
      ?.status === 'DELIVERED' &&
    tx
  )
    return (
      <Box margin="md">
        <div>Enjoy your pizza!</div>
      </Box>
    );

  if (status === SubmitStatus.SUCCESS)
    return (
      <Box margin="md">
        <div>Enjoy your pizza!</div>
      </Box>
    );
  if (status === SubmitStatus.LOADING)
    return (
      <Box margin="md">
        <div>Signing off...</div>
      </Box>
    );

  return (
    <div>
      <Box margin="md">
        <h1>Delivery Page</h1>
        <AccountButton user={account} returnPath="/v1/example/delivery" />
      </Box>
      {pendingTx && <Box margin="md">Order pending...</Box>}
      {mintedTx && <Box margin="md">Your pizza is on the way!</Box>}
      {isAcceptingOrder && deliverTx && (
        <Box margin="md">
          Sign off to receive your pizza!
          <Button onPress={onAcceptDelivery}>Sign off</Button>
        </Box>
      )}
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
