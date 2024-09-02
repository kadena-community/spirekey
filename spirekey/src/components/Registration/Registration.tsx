'use client';

import type { ChainId } from '@kadena/client';
import { Button, Heading, Stack, Text } from '@kadena/kode-ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { deviceColors } from '@/styles/shared/tokens.css';
import { getRootkeyPasskeyName } from '@/utils/getNetworkDisplayName';

import { KeyPair, useRegistration } from '@/hooks/useRegistration';
import { getUser } from '@/utils/connect';
import {
  CardContentBlock,
  CardFixedContainer,
  CardFooterGroup,
} from '@kadena/kode-ui/patterns';
import { token } from '@kadena/kode-ui/styles';
import { Account } from '@kadena/spirekey-types';
import AccountNetwork from '../Card/AccountNetwork';
import Alias from '../Card/Alias';
import Card from '../Card/Card';
import CardBottom from '../Card/CardBottom';
import DeviceIcons from '../Card/DeviceIcons';
import PasskeyCard from '../Card/PasskeyCard';
import { Step, Stepper } from '../Stepper/Stepper';
import SpireKeyKdacolorLogoGreen from '../icons/KdaLogoGreen';

interface Props {
  redirectUrl?: string;
  networkId?: string;
  chainId?: ChainId;
  onComplete?: (account: Account) => void;
  onCancel?: () => void;
}

export default function Registration({
  redirectUrl,
  networkId = process.env.WALLET_NETWORK_ID,
  chainId,
  onComplete,
  onCancel,
}: Props) {
  const router = useRouter();
  const decodedRedirectUrl = decodeURI(redirectUrl || '');
  const cancelRedirectUrl = decodedRedirectUrl || '/welcome';
  const completeRedirectUrl = decodedRedirectUrl || '/';
  const handleCancel = () => {
    if (onCancel) return onCancel();
    router.push(cancelRedirectUrl);
  };
  const {
    account,
    keypair,
    handleRegisterWallet,
    handleConnectWallet,
    isSubmitting,
    succesfulAuthentication,
    handleSubmit,
  } = useRegistration({
    networkId,
    chainId,
  });
  const handleComplete = () => {
    if (!account) throw new Error('No user registered');
    if (onComplete) return onComplete(account);
    const user = Buffer.from(JSON.stringify(getUser(account))).toString(
      'base64',
    );
    router.push(`${completeRedirectUrl}?${new URLSearchParams({ user })}`);
  };
  return (
    <RegisterComponent
      account={account}
      isSubmitting={isSubmitting}
      succesfulAuthentication={succesfulAuthentication}
      keypair={keypair}
      networkId={networkId}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
      onComplete={handleComplete}
      onHandleConnectWallet={handleConnectWallet}
      onHandleRegisterWallet={handleRegisterWallet}
    />
  );
}

const RegisterComponent = ({
  account,
  keypair,
  isSubmitting,
  succesfulAuthentication,
  networkId,
  onCancel,
  onHandleRegisterWallet,
  onHandleConnectWallet,
  onSubmit,
  onComplete,
}: {
  account?: Account;
  keypair?: KeyPair;
  isSubmitting: boolean;
  succesfulAuthentication: boolean;
  networkId: string;
  onCancel: () => void;
  onHandleConnectWallet: () => void;
  onHandleRegisterWallet: () => void;
  onSubmit: () => void;
  onComplete: () => void;
}) => {
  const [isAnimationFinished, setAnimationFinished] = useState(false);

  if (account && isAnimationFinished)
    return (
      <CardFixedContainer>
        <CardContentBlock
          visual={
            <SpireKeyKdacolorLogoGreen
              aria-label="SpireKey"
              fontSize={token('typography.fontSize.9xl')}
            />
          }
          title="Register Account"
          description={
            'Create your account to manage your web3 assets managed by your SpireKey wallet.'
          }
          supportingContent={
            <Stepper>
              <Step>Create Wallet</Step>
              <Step>Register Account</Step>
            </Stepper>
          }
          extendedContent={
            <Card
              color={deviceColors.purple}
              balancePercentage={50}
              title={<Alias title={account.alias.replace(/\(.*\)/, '')} />}
              icons={<DeviceIcons account={account} />}
              center={<AccountNetwork account={account} isLoading={true} />}
              cardBottom={<CardBottom account={account} />}
            />
          }
        />
        <CardFooterGroup>
          <Button variant="outlined" onPress={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" onPress={onComplete}>
            Complete
          </Button>
        </CardFooterGroup>
      </CardFixedContainer>
    );

  if (keypair)
    return (
      <CardFixedContainer>
        <CardContentBlock
          visual={
            <SpireKeyKdacolorLogoGreen
              aria-label="SpireKey"
              fontSize={token('typography.fontSize.9xl')}
            />
          }
          title="Register Account"
          description={
            'Create your account to manage your web3 assets managed by your SpireKey wallet.'
          }
          supportingContent={
            <Stepper>
              <Step>Create Wallet</Step>
              <Step active>Register Account</Step>
            </Stepper>
          }
          extendedContent={
            <PasskeyCard
              isInProgress={!succesfulAuthentication && isSubmitting}
              isSuccessful={succesfulAuthentication}
              onSuccessfulAnimationEnd={() => setAnimationFinished(true)}
              onSubmit={onSubmit}
            />
          }
        />
        <CardFooterGroup>
          <Button
            variant="outlined"
            onPress={onCancel}
            isDisabled={isSubmitting || succesfulAuthentication}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onPress={onSubmit}
            isDisabled={isSubmitting || succesfulAuthentication}
          >
            Continue
          </Button>
        </CardFooterGroup>
      </CardFixedContainer>
    );
  return (
    <CardFixedContainer>
      <CardContentBlock
        visual={
          <SpireKeyKdacolorLogoGreen
            aria-label="SpireKey"
            fontSize={token('typography.fontSize.9xl')}
          />
        }
        title="Connect Wallet"
        description={
          'Do you wish to manage your wallet here on SpireKey? This will become your home of operation, your gateway into the a secure web 3 experience!'
        }
        supportingContent={
          <Stepper>
            <Step active>Create Wallet</Step>
            <Step>Register Account</Step>
          </Stepper>
        }
      >
        <Stack flexDirection="column" gap="md">
          <Heading as="h5">Already have a wallet?</Heading>
          <Text>
            Provide your passkey named{' '}
            <Text bold>{getRootkeyPasskeyName(networkId)}</Text> to add another
            account to this wallet.
          </Text>
          <CardFooterGroup>
            <Button onPress={onHandleConnectWallet}>Connect</Button>
          </CardFooterGroup>
          <Heading as="h5">No wallet yet?</Heading>
          <Text>
            Create a new wallet using a passkey. This passkey will be stored on
            your device as <Text bold>{getRootkeyPasskeyName(networkId)}</Text>.
          </Text>
          <Text>
            This passkey will be used to perform maintenance operations as well
            as recovery operations. SpireKey will not use this key for signing!
          </Text>
        </Stack>
      </CardContentBlock>
      <CardFooterGroup>
        <Button onPress={onHandleRegisterWallet}>Create</Button>
      </CardFooterGroup>
    </CardFixedContainer>
  );
};
