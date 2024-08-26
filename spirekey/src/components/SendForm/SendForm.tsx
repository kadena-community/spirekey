'use client';

import { useAccounts } from '@/context/AccountsContext';
import { l1Client } from '@/utils/shared/client';
import { createTransactionBuilder } from '@kadena/client';
import { SpireKeyKdacolorLogoGreen } from '@kadena/kode-icons/product';
import {
  Button,
  NumberField,
  Select,
  SelectItem,
  Stack,
  TextField,
} from '@kadena/kode-ui';
import { Account, Device, initSpireKey, sign } from '@kadena/spirekey-sdk';
import { ChainId, ICommand } from '@kadena/types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
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
const getTransferTx = ({
  account,
  receiver,
  amount,
  chainId,
}: {
  account: Account;
  receiver: string;
  amount: number;
  chainId: ChainId;
}) => {
  const tx = createTransactionBuilder()
    .execution(
      `
    (coin.transfer "${account.accountName}" "${receiver}" ${amount.toFixed(8)})
  `,
    )
    .setMeta({
      senderAccount: account.accountName,
      chainId,
    });

  account.devices.flatMap((d: Device) =>
    d.guard.keys.map((k) =>
      tx.addSigner(
        {
          pubKey: k,
          scheme: /^WEBAUTHN-/.test(k) ? 'WebAuthn' : 'ED25519',
        },
        (withCap) => [
          withCap(`coin.TRANSFER`, account.accountName, receiver, {
            decimal: amount.toFixed(8),
          }),
          withCap(`coin.GAS`),
        ],
      ),
    ),
  );
  return tx;
};
export default function SendForm() {
  const { caccount, cid } = useParams();
  const { accounts } = useAccounts();

  const [result, setResult] = useState('');
  const [receiverError, setReceiverError] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const account = accounts.find(
    (a) => a.accountName === decodeURIComponent(caccount as string),
  );
  const decodedAccount = Array.isArray(caccount)
    ? decodeURIComponent(caccount[0])
    : decodeURIComponent(caccount);

  const defaultValues = {
    sender: decodedAccount,
    receiver: '',
    amount: 0,
    gasPayer: decodedAccount,
    networkId: account?.networkId,
    chainId: '14',
  };

  useEffect(() => {
    initSpireKey({
      hostUrl: process.env.WALLET_URL,
    });
  }, []);

  type FormValues = typeof defaultValues;

  const { handleSubmit, register, setValue } = useForm<FormValues>({
    defaultValues,
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
        amount: data.amount,
        receiver: data.receiver,
        account,
        chainId: data.chainId as ChainId,
      });
      tx.setNetworkId(data.networkId);
      console.warn('DEBUGPRINT[4]: SendForm.tsx:133: tx=', tx);
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
                amount: data.amount + 0.1, // add 0.1 to account for gas fees
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

  const amountProps = register('amount', {
    valueAsNumber: true,
    min: 0.000001,
    max: parseFloat(account.balance),
  });

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
              <Select
                label="Chain"
                onSelectionChange={(c) => setValue('chainId', c as ChainId)}
              >
                {Array(20)
                  .fill(1)
                  .map((_, i) => (
                    <SelectItem key={i}>{i.toString()}</SelectItem>
                  ))}
              </Select>
              <NumberField
                defaultValue={defaultValues.amount}
                step={0.1}
                label="Amount"
                {...amountProps}
                onValueChange={(a) => setValue('amount', a)}
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
