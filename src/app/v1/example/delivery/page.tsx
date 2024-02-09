'use client';

import { Account } from '@/components/Account';
import { Button } from '@/components/Button/Button';
import { useReturnUrl } from '@/hooks/useReturnUrl';
import { useSubmit } from '@/hooks/useSubmit';
import { decodeAccount } from '@/utils/decodeAccount';
import { transfer } from '@/utils/transfer';
import { TextField } from '@kadena/react-ui';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useConnection } from './Connection';

type DeliveryProps = {
  searchParams: {
    response: string;
    payload: string;
  };
};

export default function DeliveryPage({ searchParams }: DeliveryProps) {
  const { response } = searchParams;
  const { tx } = useSubmit(searchParams);
  const account = decodeAccount(response);
  const { connect, setId, send, isLoading } = useConnection();
  const [data, setData] = useState<string>('');
  const { getReturnUrl } = useReturnUrl();

  const router = useRouter();
  const { register, getValues } = useForm({
    defaultValues: {
      receiver: '',
      amount: 0,
    },
    reValidateMode: 'onBlur',
  });

  const onReceiverChange = () => {
    connect({
      id: '1234',
      publicKey: getValues('receiver'),
    });
  };
  const onSend = async () => {
    if (!account) return;
    const tx = await transfer({
      amount: getValues('amount'),
      receiver: getValues('receiver'),
      sender: account.accountName,
      gasPayer: getValues('receiver'),
      namespace: process.env.NAMESPACE!,
      networkId: 'fast-development',
      publicKey: account?.publicKey,
    });
    localStorage.setItem('receiver', getValues('receiver'));
    router.push(
      `${process.env.WALLET_URL}/sign?payload=${Buffer.from(
        JSON.stringify(tx),
      ).toString('base64')}&cid=${account.cid}&returnUrl=${getReturnUrl(
        '/v1/example/delivery',
      )}`,
    );
  };

  useEffect(() => {
    if (!account?.accountName) return;
    setId({ id: '1234', publicKey: account?.accountName });
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;
    if (!tx) return;
    const receiver = localStorage.getItem('receiver');
    if (!receiver) return;
    send({ id: '1234', publicKey: receiver }, { type: 'tx', data: tx });
  }, [tx, isLoading]);
  return (
    <div>
      <h1>Delivery Page</h1>
      <Account account={account} returnPath="/v1/example/delivery" />
      <TextField
        label="To"
        {...register('receiver', {
          onChange: onReceiverChange,
        })}
      />
      <TextField
        label="Amount"
        {...register('amount', {
          valueAsNumber: true,
        })}
      />
      <Button onPress={onSend}>Sign</Button>
      <p>{data}</p>
    </div>
  );
}
