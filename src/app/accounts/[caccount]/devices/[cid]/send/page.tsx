'use client';

import { useAccounts } from '@/context/AccountsContext';
import { useNetwork } from '@/context/NetworkContext';
import { useReturnUrl } from '@/hooks/useReturnUrl';
import { useSign } from '@/hooks/useSign';
import { transfer } from '@/utils/transfer';
// import { transfer } from '@/utils/transfer';
import {
  Breadcrumbs,
  BreadcrumbsItem,
  Button,
  TextField,
} from '@kadena/react-ui';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

const isCAccount = (account: string | string[]): account is string =>
  typeof account === 'string';

export default function SendPage() {
  const params = useParams();
  const router = useRouter();
  const { caccount } = useParams();
  const { accounts } = useAccounts();
  const [isLoading, setIsLoading] = useState(false);

  const FORM_DEFAULTS = {
    sender: Array.isArray(caccount)
      ? decodeURIComponent(caccount[0])
      : decodeURIComponent(caccount),
    publicKey: '',
    receiver: '',
    amount: 0,
    gasPayer: '',
    networkId: '',
    namespace: '',
  };
  type FormValues = typeof FORM_DEFAULTS;
  const { handleSubmit, register } = useForm({
    defaultValues: FORM_DEFAULTS,
    reValidateMode: 'onBlur',
  });
  const pathname = usePathname();

  const { network } = useNetwork();
  const { getReturnUrl } = useReturnUrl();
  // wallet url should probably be configurable somehow
  const { sign } = useSign(process.env.WALLET_URL!);
  const device = accounts
    .find(
      (a) =>
        a.accountName === decodeURIComponent(params.caccount as string) &&
        a.network === network,
    )
    ?.devices.find(
      (d) => d['credential-id'] === decodeURIComponent(params.cid as string),
    );
  const onSubmit = async (data: FormValues) => {
    if (!isCAccount(params.caccount)) return;
    if (!process.env.NAMESPACE) return;
    if (!device) return;
    const caccount = decodeURIComponent(params.caccount);
    const result = await transfer({
      sender: caccount,
      receiver: data.receiver,
      amount: data.amount,
      gasPayer: caccount,
      namespace: process.env.NAMESPACE,
      networkId: network,
      publicKey: device?.guard.keys[0] || '',
    });

    sign(result, device, pathname.replace(/\/send$/, 'submit'));
  };

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbsItem href={`/accounts/${params.caccount}`}>
          {decodeURIComponent(params.caccount.toString())}
        </BreadcrumbsItem>
        <BreadcrumbsItem
          href={`/accounts/${params.caccount}/devices/${params.cid}`}
        >
          {decodeURIComponent(params.cid.toString())}
        </BreadcrumbsItem>
        <BreadcrumbsItem>Send</BreadcrumbsItem>
      </Breadcrumbs>
      <h1>Send</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField id="sender" label="From" {...register('sender')} />
        <TextField
          id="publicKey"
          label="Public key"
          {...register('publicKey')}
        />
        <TextField id="receiver" label="To" {...register('receiver')} />
        <TextField
          id="amount"
          type="number"
          label="Amount"
          {...register('amount', { valueAsNumber: true })}
        />
        <TextField id="gasPayer" label="Gas payer" {...register('gasPayer')} />
        <TextField id="networkId" label="Network" {...register('networkId')} />
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
