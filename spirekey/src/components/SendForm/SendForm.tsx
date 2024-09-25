'use client';

import { useAccounts } from '@/resolvers/accounts';
import { l1Client } from '@/utils/shared/client';
import { createTransactionBuilder, ICommandResult } from '@kadena/client';
import { MonoCopyAll } from '@kadena/kode-icons/system';
import {
  Button,
  Form,
  Heading,
  Link,
  maskValue,
  NumberField,
  Select,
  SelectItem,
  Stack,
  Text,
  TextField,
} from '@kadena/kode-ui';
import { atoms } from '@kadena/kode-ui/styles';
import { Account, initSpireKey, sign } from '@kadena/spirekey-sdk';
import { ChainId, ICommand } from '@kadena/types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

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
  cids,
}: {
  account: Account;
  receiver: string;
  amount: number;
  chainId: ChainId;
  cids: string[];
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

  account.devices
    .filter((d) => cids.includes(d['credential-id']))
    .flatMap((d) =>
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
  const { raccount, cid } = useParams();
  const { accounts } = useAccounts();

  const [tx, setTx] = useState<ICommandResult>();

  const [_, setReceiverError] = useState('');
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const account = accounts.find(
    (a) => a.accountName === decodeURIComponent(raccount as string),
  );
  const decodedAccount = Array.isArray(raccount)
    ? decodeURIComponent(raccount[0])
    : decodeURIComponent(raccount);

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

  const { handleSubmit, register, setValue, getValues } = useForm<FormValues>({
    defaultValues,
  });

  const onSubmit = async (data: FormValues) => {
    if (!account) throw new Error('No account connected');
    if (!data.receiver) throw new Error('No receiver defined');
    if (!account.networkId) throw new Error('No network selected');
    try {
      setIsLoading(true);
      if (
        !(await isCoinAccountExisting({
          accountName: data.receiver,
          networkId: account.networkId,
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
        cids: Array.isArray(cid) ? cid : [cid],
      });
      tx.setNetworkId(account.networkId);
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
          const txDescriptor = await l1Client.submit(tx as ICommand);
          const txRes = await l1Client.listen(txDescriptor);
          setTx(txRes);
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

  if (tx)
    return (
      <>
        <Heading>Transfer Result</Heading>
        <Text>
          You have successfully transferred {getValues('amount')}KDA to{' '}
          {maskValue(getValues('receiver'))}
        </Text>

        <Stack flexDirection="column" gap="md">
          <TextField
            isReadOnly
            value={tx.reqKey}
            label="Request Key"
            endAddon={
              <Button
                variant="transparent"
                onPress={() => navigator.clipboard.writeText(tx.reqKey)}
              >
                <Stack as="span" flexDirection="row" gap="xs">
                  Copy
                  <MonoCopyAll />
                </Stack>
              </Button>
            }
          />
          <TextField isReadOnly label="Status" value={tx.result.status} />
          <Button
            variant="outlined"
            onPress={() => setShowDetails(!showDetails)}
            className={atoms({ marginInlineStart: 'auto' })}
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </Button>
        </Stack>

        {showDetails &&
          tx
            .events!.sort((a: any, b: any) => b.params[2] - a.params[2])
            .map(({ params }: any) => {
              const isGasEvent = params[2] < 0.1;
              return (
                <>
                  <Heading>
                    {isGasEvent ? 'Gas Fees' : 'Transfer Amount'}
                  </Heading>
                  <Text>
                    {isGasEvent
                      ? `You have paid ${params[2]} on gas fees for this transaction`
                      : `You have successfully transferred ${params[2]} KDA to ${maskValue(params[1])}`}
                  </Text>
                  <Stack flexDirection="column" gap="md">
                    <TextField label="Receiver" isReadOnly value={params[1]} />
                    <TextField label="Amount" isReadOnly value={params[2]} />
                  </Stack>
                </>
              );
            })}
      </>
    );
  return (
    <Stack
      padding="md"
      marginInline="auto"
      flexDirection="column"
      gap="md"
      as="main"
      maxWidth="content.maxWidth"
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading>Transfer KDA</Heading>

        <TextField value={account.accountName} name="sender" type="hidden" />

        <Stack flexDirection="column" gap="md" marginBlock="lg">
          <TextField
            type="text"
            defaultValue={defaultValues.receiver}
            label="Receiver"
            {...register('receiver')}
          />
          <Stack width="100%" gap="md">
            <Select
              label="Chain"
              defaultSelectedKey="0"
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
              label={`Amount (max: ${parseFloat(account.balance).toLocaleString() ?? '0.0'} KDA)`}
              minValue={0.0}
              maxValue={parseFloat(account.balance) ?? 0.0}
              {...amountProps}
              onValueChange={(a) => setValue('amount', a)}
            />
          </Stack>
        </Stack>

        <Stack width="100%" justifyContent="flex-end" gap="md">
          <Link variant="outlined" href="/">
            Cancel
          </Link>
          <Button
            isLoading={isLoading}
            variant="primary"
            isCompact={false}
            type="submit"
          >
            Sign
          </Button>
        </Stack>
      </Form>
    </Stack>
  );
}
