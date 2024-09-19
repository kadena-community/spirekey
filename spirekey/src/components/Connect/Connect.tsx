import { SpireKeyCardContentBlock } from '@/components/SpireKeyCardContentBlock';
import { useAccounts } from '@/resolvers/accounts';
import { getNetworkDisplayName } from '@/utils/getNetworkDisplayName';
import { ChainId } from '@kadena/client';
import { Button, Heading, Stack, Text } from '@kadena/kode-ui';
import {
  CardContentBlock,
  CardFixedContainer,
  CardFooterGroup,
} from '@kadena/kode-ui/patterns';
import { token } from '@kadena/kode-ui/styles';
import { Account } from '@kadena/spirekey-types';
import { useState } from 'react';
import { AccountTile } from '../AccountTile/AccountTile';
import Recover from '../Recover/Recover';
import Registration from '../Registration/Registration';
import SpireKeyKdacolorLogoGreen from '../icons/KdaLogoGreen';

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
  const { accounts } = useAccounts();
  const [isRegister, setIsRegister] = useState(false);
  const [isRecover, setIsRecover] = useState(false);

  const candidateAccounts = accounts.filter(
    (account) => account.networkId === networkId,
  );

  const startRegister = () => {
    setIsRegister(true);
  };

  const startRecover = () => {
    setIsRecover(true);
  };

  const connectAndPrime = async (account: Account) => {
    return onConnect(account);
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

  if (isRecover)
    return (
      <Recover
        networkId={networkId}
        chainId={chainId}
        onComplete={onConnect}
        onCancel={onCancel}
      />
    );

  if (!candidateAccounts.length)
    return (
      <>
        <CardFixedContainer>
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
          <CardFooterGroup>
            <Button variant="outlined" onPress={startRecover}>
              Recover
            </Button>
            <Button onPress={startRegister}>Register</Button>
          </CardFooterGroup>
        </CardFixedContainer>
      </>
    );

  return (
    <CardFixedContainer>
      <SpireKeyCardContentBlock
        title="Accounts"
        description={`available for network: ${getNetworkDisplayName(networkId)}`}
      >
        <Stack gap="sm" flexDirection="column">
          {candidateAccounts.map((account) => (
            <AccountTile
              key={account.accountName}
              account={account}
              onClick={connectAndPrime}
            />
          ))}
        </Stack>
      </SpireKeyCardContentBlock>
      <CardFooterGroup>
        <Button onPress={startRegister} variant="transparent">
          Register another account
        </Button>
        <Button onPress={onCancel} variant="outlined">
          Cancel
        </Button>
      </CardFooterGroup>
    </CardFixedContainer>
  );
}
