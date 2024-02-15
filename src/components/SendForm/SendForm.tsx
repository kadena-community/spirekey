'use client';

import { useAccounts } from '@/context/AccountsContext';
import { useSign } from '@/hooks/useSign';
import { l1Client } from '@/utils/client';
import { transfer } from '@/utils/transfer';
import { isSignedTransaction } from '@kadena/client';
import {
  Button,
  Stack,
  Text,
  TextField,
} from '@kadena/react-ui';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as style from './SendForm.css';

const isCAccount = (account: string | string[]): account is string =>
  typeof account === 'string';

export default function SendForm() {
  const router = useRouter();
  const params = useParams();
  const { caccount, cid } = useParams();
  const { accounts } = useAccounts();
  const [isLoading, setIsLoading] = useState(false);
  const [amountInfo, setAmountInfo] = useState('');

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

  const { sign } = useSign();

  const onSubmit = async (data: FormValues) => {
    if (!isCAccount(data.sender)) return;
    if (!process.env.NAMESPACE) return;
    if (!device) return;
    setIsLoading(true);
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

    const signedTx = await sign(command, device['credential-id']);
    if (isSignedTransaction(signedTx)) {
      const transactiionDescriptor = await l1Client.submitOne(signedTx);
      await l1Client.listen(transactiionDescriptor);
    }

    setIsLoading(false);

    router.push(`/accounts/${caccount}/devices/${cid}/transactions`);
  };

  const amount = watch('amount');
  const gasPayer = watch('gasPayer');

  useEffect(() => {
    if (gasPayer !== account?.accountName || amount !== parseFloat(account.balance || '')) {
      return setAmountInfo('');
    }
    setAmountInfo('Paying for gas will fail when you transfer your full balance')
  }, [amount, gasPayer, account]);

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
          description={
            <Stack gap="xs" alignItems="center">
              <Button
                variant="contained"
                className={style.maxButton}
                onClick={() => setValue('amount', parseFloat(account?.balance || ''))}
              >
                <span className={style.maxButtonText}>MAX</span>
              </Button>
              <span className={style.balanceText}>{account?.balance} KDA account balance</span>
            </Stack>
          }
          defaultValue={defaultValues.amount.toString()}
          validationBehavior="native"
          isRequired
          {...register('amount', {
            valueAsNumber: true,
            min: 0.000001,
            max: parseFloat(account?.balance || ''),
          })}
        />
        <TextField
          label="Gas payer"
          defaultValue={defaultValues.gasPayer}
          validationBehavior="native"
          isRequired
          {...register('gasPayer')}
        />
        <Button type="submit">{isLoading ? 'Loading' : 'Send'}</Button>
      </Stack>
    </form>
  );
}
