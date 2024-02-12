'use client';

import { useAccounts } from '@/context/AccountsContext';
import { useSign } from '@/hooks/useSign';
import { transfer } from '@/utils/transfer';
import {
  Breadcrumbs,
  BreadcrumbsItem,
  Button,
  Select,
  SelectItem,
  Text,
  TextField,
} from '@kadena/react-ui';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const isCAccount = (account: string | string[]): account is string =>
  typeof account === 'string';

export default function SendPage() {
  const params = useParams();
  const { caccount, cid } = useParams();
  const { accounts } = useAccounts();
  const [isLoading, setIsLoading] = useState(false);
  const account = accounts.find(
    (a) => a.accountName === decodeURIComponent(params.caccount as string),
  );
  const device = account?.devices.find(
    (d) => d['credential-id'] === decodeURIComponent(cid as string),
  );
  const pubkeys = device?.guard.keys || [];
  const network = account?.network || '';

  const FORM_DEFAULTS = {
    sender: Array.isArray(caccount)
      ? decodeURIComponent(caccount[0])
      : decodeURIComponent(caccount),
    publicKey: pubkeys[0] || '',
    receiver: '',
    amount: 0,
    gasPayer: '',
    networkId: account?.network,
    namespace: process.env.NAMESPACE || '',
  };

  type FormValues = typeof FORM_DEFAULTS;
  const { handleSubmit, register, control } = useForm({
    defaultValues: FORM_DEFAULTS,
    reValidateMode: 'onBlur',
  });
  const { sign } = useSign();
  const onSubmit = async (data: FormValues) => {
    if (!isCAccount(data.sender)) return;
    if (!process.env.NAMESPACE) return;
    if (!device) return;
    setIsLoading(true);
    const caccount = decodeURIComponent(data.sender);
    const result = await transfer({
      sender: caccount,
      receiver: data.receiver,
      amount: data.amount,
      gasPayer: caccount,
      namespace: process.env.NAMESPACE,
      networkId: network,
      publicKey: device?.guard.keys[0] || '',
    });

    await sign(result, device['credential-id']);
    setIsLoading(false);
  };

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbsItem href={`/accounts/${params.caccount}`}>
          {decodeURIComponent(params.caccount.toString())}
        </BreadcrumbsItem>
        <BreadcrumbsItem href={`/accounts/${params.caccount}/devices/${cid}`}>
          {decodeURIComponent(cid.toString())}
        </BreadcrumbsItem>
        <BreadcrumbsItem>Send</BreadcrumbsItem>
      </Breadcrumbs>

      <h1>Send</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="sender"
          label="From"
          disabled={true}
          {...register('sender')}
        />

        <Text>Public Key</Text>
        <Controller
          control={control}
          name="publicKey"
          rules={{ required: true }}
          render={({ field }) => (
            <Select id="publicKey" aria-label="Public key" {...field}>
              {pubkeys.map((credential) => (
                <SelectItem key={credential}>
                  {`WEBAUTHN-${credential}`}
                </SelectItem>
              ))}
            </Select>
          )}
        />

        <TextField id="receiver" label="To" {...register('receiver')} />

        <TextField
          id="amount"
          type="number"
          label="Amount"
          {...register('amount', { valueAsNumber: true })}
        />
        <TextField id="gasPayer" label="Gas payer" {...register('gasPayer')} />

        <Select
          label="Network"
          id="network"
          aria-label="Network"
          {...register('networkId')}
        >
          <SelectItem key="testnet04">Testnet04</SelectItem>
          <SelectItem key="fast-development">Fast Development</SelectItem>
        </Select>

        <TextField
          id="namespace"
          label="Namespace"
          {...register('namespace')}
        />

        <Button type="submit">{isLoading ? 'Loading' : 'Send'}</Button>
      </form>
    </div>
  );
}
