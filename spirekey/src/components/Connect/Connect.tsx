import { MaskedValue } from '@/components/MaskedValue/MaskedValue';
import { useAccounts } from '@/context/AccountsContext';
import { getRegisterCommand } from '@/utils/register';
import { l1Client } from '@/utils/shared/client';
import { ChainId } from '@kadena/client';
import { SpireKeyKdacolorLogoGreen } from '@kadena/kode-icons/product';
import { Button, Heading, Link, Stack, Text } from '@kadena/kode-ui';
import { token } from '@kadena/kode-ui/styles';
import { Account } from '@kadena/spirekey-types';
import { useState } from 'react';
import {
  CardContainer,
  CardContentBlock,
  CardFooter,
  SpireKeyCardContentBlock,
} from '../CardPattern/CardPattern';
import DeviceCircle from '../Device/DeviceCircle';
import Registration from '../Registration/Registration';

type ConnectComponentProps = {
  chainId: ChainId;
  networkId: string;
  onConnect: (account: Account) => void;
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

  const connectAndPrime = async (account: Account) => {
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
      <>
        <CardContainer>
          <CardContentBlock
            title=""
            visual={
              <Stack alignItems="center" gap="sm">
                <SpireKeyKdacolorLogoGreen
                  fontSize={token('typography.fontSize.9xl')}
                />
                <Stack flexDirection="column">
                  <Text transform="uppercase" variant="body">
                    kadena
                  </Text>
                  <Heading as="h1" variant="h2">
                    SpireKey
                  </Heading>
                </Stack>
              </Stack>
            }
          >
            <Stack flexDirection="column" marginBlockEnd="xxxl">
              <Heading as="h5">No account yet?</Heading>
              <Text>Create an new account with a passkey.</Text>
            </Stack>
            <Stack flexDirection="column">
              <Heading as="h5">Inspired Already</Heading>
              <Text>Recover your existing account with your passkey.</Text>
            </Stack>
          </CardContentBlock>
          <CardFooter>
            <Link variant="outlined" href="/recover">
              Recover
            </Link>
            <Button onPress={startRegister}>Register</Button>
          </CardFooter>
        </CardContainer>
      </>
    );

  return (
    <CardContainer>
      <SpireKeyCardContentBlock
        title="Accounts"
        description="available for use"
      >
        <Stack gap="xl">
          {candidateAccounts.map((account) => (
            <Stack
              key={account.accountName}
              flexDirection="row"
              gap="xl"
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
        </Stack>
      </SpireKeyCardContentBlock>
      <CardFooter>
        <Button onPress={onCancel} variant="outlined">
          Cancel
        </Button>
      </CardFooter>
    </CardContainer>
  );
}
