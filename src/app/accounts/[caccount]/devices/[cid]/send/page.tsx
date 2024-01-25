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

const FORM_DEFAULTS = {
  to: '',
  amount: 0,
};
type FormValues = typeof FORM_DEFAULTS;

const isCAccount = (account: string | string[]): account is string =>
  typeof account === 'string';

export default function SendPage() {
  const params = useParams();
  const { accounts } = useAccounts();
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
      receiver: data.to,
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
        <TextField id="to" label="To" {...register('to')} />
        <TextField
          id="amount"
          type="number"
          label="Amount"
          {...register('amount', { valueAsNumber: true })}
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}
