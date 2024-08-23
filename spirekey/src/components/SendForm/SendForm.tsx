'use client';

import { useAccounts } from '@/context/AccountsContext';
import { l1Client } from '@/utils/shared/client';
import { createTransactionBuilder } from '@kadena/client';
import { SpireKeyKdacolorLogoGreen } from '@kadena/kode-icons/product';
import { Button, NumberField, Stack, TextField } from '@kadena/kode-ui';
import { sign } from '@kadena/spirekey-sdk';
import { ChainId } from '@kadena/types';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  CardContainer,
  CardContentBlock,
  CardFooter,
} from '../CardPattern/CardPattern';

const isCAccount = (account: string | string[]): account is string =>
  typeof account === 'string';
const isCoinAccountExisting = async ({
  accountName,
  networkId,
  chainId,
}: {
  accountName: string;
  networkId: string;
  chainId: ChainId;
}) => {
  const tx = createTransactionBuilder()
    .execution(`(coin.details "${accountName}")`)
    .setMeta({ chainId })
    .setNetworkId(networkId)
    .createTransaction();
  const res = await l1Client.local(tx, {
    preflight: false,
    signatureVerification: false,
  });
  return res.result.status === 'success';
};
export default function SendForm() {
  const { caccount, cid } = useParams();
  const { accounts } = useAccounts();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const account = accounts.find(
    (a) => a.accountName === decodeURIComponent(caccount as string),
  );
  const device = account?.devices.find(
    (d) => d['credential-id'] === decodeURIComponent(cid as string),
  );
  const pubkeys = device?.guard.keys || [];
  const network = account?.networkId || '';
  const decodedAccount = Array.isArray(caccount)
    ? decodeURIComponent(caccount[0])
    : decodeURIComponent(caccount);
  const publicKey = pubkeys[0] || '';

  const defaultValues = {
    sender: decodedAccount,
    receiver: '',
    amount: 0,
    gasPayer: decodedAccount,
    networkId: account?.networkId,
    chainId: '14'
  };

  type FormValues = typeof defaultValues;

  const { handleSubmit, register, getValues, setValue, watch } =
    useForm<FormValues>({
      defaultValues,
      reValidateMode: 'onChange',
    });

  const onSubmit = async (data: FormValues) => {
    if (!account) throw new Error('No account connected');
    if (!data.receiver) throw new Error('No receiver defined');
    if (!data.networkId) throw new Error('No network selected');
    try {
      setIsLoading(true);
      if (
        !(await isCoinAccountExisting({
          accountName: data.receiver,
          networkId: data.networkId,
          chainId: data.chainId as ChainId,
        }))
      ) {
        setReceiverError('Account does not exist');
        throw new Error('Account does not exist');
      }
      setReceiverError('');
      const tx = getTransferTx({
        amount: parseFloat(amount),
        receiver,
        account,
        chainId: chainId as ChainId,
      });
      tx.setNetworkId(networkId);
      const { transactions, isReady } = await sign(
        [tx.createTransaction()],
        [
          {
            accountName: account.accountName,
            networkId: account.networkId,
            chainIds: account.chainIds,
            requestedFungibles: [
              {
                fungible: 'coin',
                amount: parseFloat(amount) + 0.1, // add 0.1 to account for gas fees
              },
            ],
          },
        ],
      );
      await isReady();
      await Promise.all(
        transactions.map(async (tx) => {
          const res = await l1Client.local(tx);
          console.log('Preflight result', res);
          const txDescriptor = await l1Client.submit(tx as ICommand);
          const txRes = await l1Client.listen(txDescriptor);
          setResult(JSON.stringify(txRes, null, 2));
        }),
      );
    } catch (e) {
      if (e instanceof Error && e.message === 'Account does not exist') throw e;
      console.warn('User canceled signin', e);
    } finally {
      setIsLoading(false);
    }
  };
  if (!account) return <div>Account not found</div>;

  return (
    <Stack
      padding="md"
      marginInline="auto"
      flexDirection="column"
      gap="md"
      as="main"
      maxWidth="content.maxWidth"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContainer hasPadding>
          <CardContentBlock
            visual={<SpireKeyKdacolorLogoGreen />}
            title="Transfer"
            description={
              <>
                <p>your KDA to another account.</p>
              </>
            }
          >
            <Stack flexDirection="column" gap="md">
              <TextField
                value={account.accountName}
                name="sender"
                type="text"
                label={`Sender: ${account.balance} (KDA)`}
                isReadOnly
                disabled
              />
              <TextField
                type="text"
                defaultValue={defaultValues.receiver}
                label="Receiver"
                {...register('receiver')}
              />
              <NumberField
                defaultValue={defaultValues.amount}
                minValue={0}
                step={0.1}
                label="Amount"
                {...register('amount', {
                  valueAsNumber: true,
                  min: 0.000001,
                  max: parseFloat(account.balance),
                })}
              />
            </Stack>
          </CardContentBlock>
        </CardContainer>
        <CardFooter>
          <Button
            isLoading={isLoading}
            variant="primary"
            isCompact={false}
            type="submit"
          >
            Sign
          </Button>
        </CardFooter>
      </form>
    </Stack>
  );
}
