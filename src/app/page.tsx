'use client';

import { Loader } from '@/components/CreateWalletLoader/Loader';
import { NetworkSelector } from '@/components/NetworkSelector';
import { useNetwork } from '@/context/NetworkContext';
import { useAccounts } from '@/hooks/useAccounts';
import { registerAccount } from '@/utils/register';
import { getNewWebauthnKey } from '@/utils/webauthnKey';
import {
  Button,
  Card,
  ContentHeader,
  MaskedValue,
  Stack,
  Table,
  Text,
  TextField,
  TrackerCard,
} from '@kadena/react-ui';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

type Transaction = {
  fromAccount: string;
  toAccount: string;
  amount: string;
  blockTime: string;
  requestKey: string;
};

const FORM_DEFAULT = {
  displayName: '',
};
const Register = () => {
  const { register, getValues } = useForm({
    defaultValues: FORM_DEFAULT,
    reValidateMode: 'onBlur',
  });
  const { storeAccount } = useAccounts();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const onRegister = async () => {
    const { displayName } = getValues();
    if (!displayName) throw new Error('Display name is required');
    setIsLoading(true);

    const { credentialId, publicKey } = await getNewWebauthnKey(displayName);

    const caccount = await registerAccount({
      credentialPubkey: publicKey,
      credentialId: credentialId,
      displayName,
      domain: window.location.hostname,
    });
    await storeAccount(caccount);
    setIsLoading(false);
    setResult(caccount);
  };

  if (result)
    return (
      <Card fullWidth>
        <Stack direction="column" gap="$md" margin="$md">
          <ContentHeader
            heading="WebAuthn Wallet"
            description="Create an account using WebAuthn"
            icon="Account"
          />
          <Text>Your account has been forged successfully!</Text>
          <Text bold>{result}</Text>
        </Stack>
      </Card>
    );

  if (isLoading)
    return (
      <Card fullWidth>
        <Stack direction="column" gap="$md" margin="$md">
          <Text>Your wallet is forging...</Text>
          <Loader />
        </Stack>
      </Card>
    );
  return (
    <Card fullWidth>
      <Stack direction="column" gap="$md" margin="$md">
        <ContentHeader
          heading="WebAuthn Wallet"
          description="Create an account using WebAuthn"
          icon="Account"
        />
        <TextField
          label="Display Name"
          inputProps={{
            id: 'display-name',
            ...register('displayName', { required: true }),
          }}
          info="This name is only for your convienience to recognize your device."
          helperText="This name will be stored on the blockchain, don't use any sensitive information."
        />
        <Button onClick={onRegister}>Register</Button>
      </Stack>
    </Card>
  );
};

const Restore = () => {
  return (
    <Card fullWidth>
      <Stack direction="column" gap="$md" margin="$md">
        <ContentHeader
          heading="WebAuthn Wallet"
          description="Restore an account using WebAuthn"
          icon="Account"
        />
        <Link href="/restore">Restore</Link>
      </Stack>
    </Card>
  );
};

export default function Home() {
  const { activeAccount } = useAccounts();
  const { chainwebDataUrl } = useNetwork();
  const { data, error, isLoading } = useSWR(
    `${chainwebDataUrl}/txs/account/${activeAccount?.account}`,
    async (url: string) => {
      if (!activeAccount) return [];
      return await fetch(url).then((res) => res.json());
    },
  );

  if (activeAccount) {
    return (
      <Stack margin="$md" direction="column">
        <NetworkSelector />
        <Card fullWidth>
          <Stack direction="column" gap="$md">
            <ContentHeader
              heading="WebAuthn Wallet"
              description="Manage your WebAuthn account"
              icon="Account"
            />
            <TrackerCard
              icon="ManageKda"
              labelValues={[
                {
                  label: 'Account',
                  value: activeAccount.account,
                  isAccount: true,
                },
                {
                  label: 'Balance',
                  value: `${activeAccount.balance} KDA`,
                },
              ]}
            />
            <Table.Root striped>
              <Table.Head>
                <Table.Tr>
                  <Table.Th>From</Table.Th>
                  <Table.Th>To</Table.Th>
                  <Table.Th>KDA</Table.Th>
                  <Table.Th>Date</Table.Th>
                </Table.Tr>
              </Table.Head>
              <Table.Body>
                {data?.map((tx: Transaction) => (
                  <Table.Tr key={tx.requestKey}>
                    <Table.Td>
                      <MaskedValue value={tx.fromAccount} />
                    </Table.Td>
                    <Table.Td>
                      <MaskedValue value={tx.toAccount} />
                    </Table.Td>
                    <Table.Td>
                      <span
                        style={{
                          color:
                            tx.fromAccount === activeAccount.account
                              ? 'red'
                              : 'green',
                        }}
                      >
                        {tx.amount}
                      </span>
                    </Table.Td>
                    <Table.Td>
                      {new Date(tx.blockTime).toLocaleDateString()}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Body>
            </Table.Root>
          </Stack>
        </Card>
      </Stack>
    );
  }

  return (
    <Stack direction="column" gap="$md" margin="$md">
      <Register />
      <Restore />
    </Stack>
  );
}
