'use client';

import { useAccounts } from '@/context/AccountsContext';
import { useReturnUrl } from '@/hooks/useReturnUrl';
import { transfer } from '@/utils/transfer';
import { Button, Stack, TextField } from '@kadena/react-ui';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ButtonLink } from '../ButtonLink/ButtonLink';
import * as style from './SendForm.css';

const isCAccount = (account: string | string[]): account is string =>
  typeof account === 'string';

export default function SendForm() {
  const router = useRouter();
  const params = useParams();
  const { caccount, cid } = useParams();
  const { accounts } = useAccounts();
  const { getReturnUrl } = useReturnUrl();

  const account = accounts.find(
    (a) => a.accountName === decodeURIComponent(params.caccount as string),
  );
  const device = account?.devices.find(
    (d) => d['credential-id'] === decodeURIComponent(cid as string),
  );
  const pubkeys = device?.guard.keys || [];
  const network = account?.network || '';
  const decodedAccount = Array.isArray(caccount)
    ? decodeURIComponent(caccount[0])
    : decodeURIComponent(caccount);
  const publicKey = pubkeys[0] || '';

  const defaultValues = {
    sender: decodedAccount,
    receiver: '',
    amount: 0,
    gasPayer: decodedAccount,
    networkId: account?.network,
    namespace: process.env.NAMESPACE || '',
  };

  type FormValues = typeof defaultValues;

  const { handleSubmit, register, setValue, watch } = useForm<FormValues>({
    defaultValues,
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: FormValues) => {
    if (!isCAccount(data.sender)) return;
    if (!process.env.NAMESPACE) return;
    if (!device) return;

    const caccount = decodeURIComponent(data.sender);
    const command = await transfer({
      sender: caccount,
      receiver: data.receiver,
      amount: data.amount,
      gasPayer: data.gasPayer,
      namespace: process.env.NAMESPACE,
      networkId: network,
      publicKey,
    });

    router.push(
      `${process.env.WALLET_URL}/sign?transaction=${Buffer.from(
        JSON.stringify(command),
      ).toString('base64')}&returnUrl=${getReturnUrl('/submit')}`,
    );
  };

  const amount = watch('amount');
  const gasPayer = watch('gasPayer');

  if (!account)
    return (
      <div>
        Account not found <ButtonLink href="/">Go back home</ButtonLink>
      </div>
    );

  const amountInfo =
    gasPayer === account.accountName || amount === parseFloat(account.balance)
      ? 'Paying for gas will fail when you transfer your full balance'
      : '';

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack flexDirection="column" gap="md">
        <TextField
          label="From"
          disabled={true}
          defaultValue={defaultValues.sender}
          {...register('sender')}
        />
        <TextField
          label="To"
          validationBehavior="native"
          isRequired
          {...register('receiver')}
        />
        <TextField
          type="number"
          label="Amount"
          info={amountInfo}
          value={amount.toString()}
          description={
            <Stack gap="xs" alignItems="center">
              <Button
                variant="contained"
                className={style.button}
                onClick={() =>
                  setValue('amount', parseFloat(account.balance) / 2)
                }
              >
                <span className={style.buttonText}>Half</span>
              </Button>
              <Button
                variant="contained"
                className={style.button}
                onClick={() => setValue('amount', parseFloat(account.balance))}
              >
                <span className={style.buttonText}>Max</span>
              </Button>
              <span className={style.balanceText}>
                {account.balance} KDA account balance
              </span>
            </Stack>
          }
          defaultValue={defaultValues.amount.toString()}
          validationBehavior="native"
          isRequired
          {...register('amount', {
            valueAsNumber: true,
            min: 0.000001,
            max: parseFloat(account.balance),
          })}
        />
        <TextField
          label="Gas payer"
          defaultValue={defaultValues.gasPayer}
          validationBehavior="native"
          isRequired
          {...register('gasPayer')}
        />
        <Button type="submit">Send</Button>
      </Stack>
    </form>
  );
}
