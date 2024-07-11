import { MaskedValue } from '@/components/MaskedValue/MaskedValue';
import { SpireKeyAccount, useAccounts } from '@/context/AccountsContext';
import { getRegisterCommand } from '@/utils/register';
import { l1Client } from '@/utils/shared/client';
import { ChainId } from '@kadena/client';
import { Button, Link, Stack, Text } from '@kadena/kode-ui';
import { useState } from 'react';
import { Heading } from 'react-aria-components';
import DeviceCircle from '../Device/DeviceCircle';
import { LayoutSurface } from '../LayoutSurface/LayoutSurface';
import Registration from '../Registration/Registration';

type ConnectComponentProps = {
  chainId: ChainId;
  networkId: string;
  onConnect: (account: SpireKeyAccount) => void;
  onCancel: () => void;
};

export default function ConnectComponent({
  chainId,
  networkId,
  onConnect,
  onCancel,
}: ConnectComponentProps) {
  const { accounts, setAccount } = useAccounts();
  const [isRegister, setIsRegister] = useState(false);

  const candidateAccounts = accounts.filter(
    (account) => account.networkId === networkId,
  );

  const startRegister = () => {
    setIsRegister(!candidateAccounts.length);
  };

  const connectAndPrime = async (account: SpireKeyAccount) => {
    const { devices, txQueue, chainIds, accountName } = account;
    if (chainIds.includes(chainId)) return onConnect(account);

    const device = devices[0];
    const cmd = await getRegisterCommand({
      accountName,
      networkId,
      chainId,
      color: device.color,
      domain: device.domain,
      deviceType: device.deviceType,
      credentialId: device['credential-id'],
      credentialPubkey: device.guard.keys[0],
    });

    const tx = await l1Client.submit(cmd);
    const updatedAccount = {
      ...account,
      txQueue: [...txQueue, tx],
      chainIds: [...chainIds, chainId],
    };
    setAccount(updatedAccount);
    onConnect(updatedAccount);
  };

  if (isRegister)
    return (
      <Registration
        networkId={networkId}
        chainId={chainId}
        onComplete={onConnect}
        onCancel={onCancel}
      />
    );

  if (!candidateAccounts.length)
    return (
      <LayoutSurface title="" subtitle="" useLogoTitle>
        <Stack flexDirection="column" gap="xxxl">
          <Stack flexDirection="column">
            <Heading>No account yet?</Heading>
            <Text>Create an new account with a passkey.</Text>
          </Stack>
          <Stack flexDirection="column">
            <Heading>Inspired Already</Heading>
            <Text>Recover your existing account with your passkey.</Text>
          </Stack>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            marginBlock="lg"
          >
            <Link variant="outlined" href="/recover">
              Recover
            </Link>
            <Button onPress={startRegister}>Register</Button>
          </Stack>
        </Stack>
      </LayoutSurface>
    );

  return (
    <LayoutSurface title="Accounts" subtitle="available for use">
      <Stack flexDirection="column" gap="sm">
        {candidateAccounts.map((account) => (
          <Stack
            key={account.accountName}
            flexDirection="row"
            gap="xl"
            marginBlockEnd="xl"
            borderColor="base.subtle"
            borderWidth="normal"
            borderStyle="solid"
            borderRadius="sm"
            paddingBlock="md"
            paddingInline="lg"
            alignItems="center"
            onClick={() => connectAndPrime(account)}
            cursor="pointer"
          >
            <Stack flexGrow={1} alignItems="center" gap="sm">
              <DeviceCircle device={account.devices[0]} />
              <Text>{account.alias}</Text>
            </Stack>
            <MaskedValue value={account.accountName} />
          </Stack>
        ))}
        <Button onPress={onCancel} variant="outlined">
          Cancel
        </Button>
      </Stack>
    </LayoutSurface>
  );
}
