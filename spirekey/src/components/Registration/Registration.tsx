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
import type { SVGProps } from 'react';
import AccountNetwork from '../Card/AccountNetwork';
import Alias from '../Card/Alias';
import Card from '../Card/Card';
import CardBottom from '../Card/CardBottom';
import DeviceIcons from '../Card/DeviceIcons';
import PasskeyCard from '../Card/PasskeyCard';
import { Step, Stepper } from '../Stepper/Stepper';

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
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SpireKeyKdacolorLogoGreen = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    data-style="kdacolor"
    viewBox="0 0 331 331"
    fill="none"
    fontSize="1.5em"
    height="1em"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M143.23 0.752441L107.499 21.391L107.489 62.6477L143.23 83.2864L178.961 62.6477V21.391L143.23 0.752441Z"
      fill="#F5F5F5"
    />
    <path
      d="M143.231 330.857L107.5 310.228V268.961L71.7693 289.59L36.0382 268.961V227.694L108.397 185.912L107.5 145.16L36.0279 185.912L0.296875 165.799V124.532L107.5 62.6368L143.231 83.2651L178.962 62.6368L286.166 124.532V165.799C286.166 165.799 249.754 186.778 250.095 186.603C250.435 186.427 178.962 145.707 178.962 145.707L179.859 185.912L250.435 227.694V268.961L214.704 289.353L178.973 268.961V310.228L143.242 330.857H143.231Z"
      fill="#4A9079"
    />
  </svg>
);
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
            {networkId === 'mainnet01' && <Button>Connect Coming soon</Button>}
            {networkId !== 'mainnet01' && (
              <Button onPress={onHandleConnectWallet}>Connect</Button>
            )}
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
        {networkId === 'mainnet01' && <Button>Create Coming soon</Button>}
        {networkId !== 'mainnet01' && (
          <Button onPress={onHandleRegisterWallet}>Create</Button>
        )}
      </CardFooterGroup>
    </CardFixedContainer>
  );
};
