'use client';

import type { ChainId } from '@kadena/client';
import {
  kadenaDecrypt,
  kadenaEncrypt,
  kadenaGenKeypairFromSeed,
} from '@kadena/hd-wallet';
import { Button, Heading, Stack, Text } from '@kadena/kode-ui';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  AccountRegistration,
  RegisterAccountFn,
  useAccounts,
} from '@/context/AccountsContext';
import { useNotifications } from '@/context/shared/NotificationsContext';
import { useReturnUrl } from '@/hooks/shared/useReturnUrl';
import { deviceColors } from '@/styles/shared/tokens.css';
import { countWithPrefixOnDomain } from '@/utils/countAccounts';
import { getNetworkDisplayName } from '@/utils/getNetworkDisplayName';
import {
  getAccountName,
  getRAccountName,
  getWebAuthnPubkeyFormat,
  registerRAccounts,
} from '@/utils/register';
import { getNewWebauthnKey } from '@/utils/webauthnKey';

import {
  CardContainer,
  CardContentBlock,
  CardFooter,
  SpireKeyCardContentBlock,
} from '@/components/CardPattern/CardPattern';
import { useRAccount } from '@/flags/flags';
import { getUser } from '@/utils/connect';
import { genKeyPair } from '@kadena/cryptography-utils';
import { SpireKeyKdacolorLogoGreen } from '@kadena/kode-icons/product';
import { token } from '@kadena/kode-ui/styles';
import { Account } from '@kadena/spirekey-types';
import AccountNetwork from '../Card/AccountNetwork';
import Alias from '../Card/Alias';
import Card from '../Card/Card';
import CardBottom from '../Card/CardBottom';
import DeviceIcons from '../Card/DeviceIcons';
import PasskeyCard from '../Card/PasskeyCard';
import { Step, Stepper } from '../Stepper/Stepper';
import * as styles from './Registration.css';

interface Props {
  redirectUrl?: string;
  networkId?: string;
  chainId?: ChainId;
  onComplete?: (account: Account) => void;
  onCancel?: () => void;
}
type KeyPair = { publicKey: string; secretKey: string };

const rootkeyPasskeyName = `SpireKey Wallet Key (DO NOT USE FOR SIGNING)`;

export const registerNewDevice =
  (
    registerAccount: RegisterAccountFn,
    onPasskeyRetrieved: (account: Account) => void,
  ) =>
  async ({
    alias,
    networkId,
    chainId,
    color,
    domain,
    keypair,
  }: Omit<
    AccountRegistration,
    'accountName' | 'credentialPubkey' | 'deviceType' | 'credentialId'
  > & { keypair?: KeyPair }): Promise<void> => {
    const { publicKey, deviceType, credentialId } =
      await getNewWebauthnKey(alias);
    const account = {
      networkId,
      credentialId,
      deviceType,
      chainId,
      alias,
      color,
      domain,
      credentialPubkey: publicKey,
    };
    if (useRAccount()) {
      if (!keypair) throw new Error('No keypair provided');
      const { name: accountName, guard } = await getRAccountName(
        publicKey,
        keypair.publicKey,
        networkId,
      );
      const pendingTxs = await registerRAccounts({
        ...account,
        accountName,
        publicKey: keypair.publicKey,
        secretKey: keypair.secretKey,
      });
      onPasskeyRetrieved({
        accountName,
        guard,
        networkId,
        balance: '0.0',
        alias,
        chainIds: Array(20)
          .fill(1)
          .map((_, i) => i.toString()) as ChainId[],
        minApprovals: 1,
        minRegistrationApprovals: 1,
        devices: [
          {
            color,
            deviceType,
            domain,
            guard: {
              keys: [getWebAuthnPubkeyFormat(publicKey)],
              pred: 'keys-any',
            },
            'credential-id': credentialId,
          },
        ],
        txQueue: pendingTxs,
      });
      return;
    }

    const accountName = await getAccountName(publicKey, networkId);
    onPasskeyRetrieved(await registerAccount({ ...account, accountName }));
  };

type UseRegistration = {
  chainId?: ChainId;
  networkId?: string;
};
const useRegistration = ({ chainId, networkId }: UseRegistration) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [allowRedirect, setAllowRedirect] = useState<boolean>(false);
  const [currentAccountName, setCurrentAccountName] = useState<string>('');
  const [succesfulAuthentication, setSuccesfulAuthentication] =
    useState<boolean>(false);
  const [account, setCurrentAccount] = useState<Account>();
  const [keypair, setKeypair] = useState<KeyPair>();

  const { registerAccount, accounts, setAccount } = useAccounts();
  const { host } = useReturnUrl();
  const { addNotification } = useNotifications();

  const accountPrefix = 'SpireKey Account';

  const currentNetwork = networkId || process.env.WALLET_NETWORK_ID!;

  const numberOfSpireKeyAccounts = countWithPrefixOnDomain(
    accounts,
    accountPrefix,
    host,
    currentAccountName,
  );

  const alias = `${accountPrefix} ${numberOfSpireKeyAccounts + 1}`;
  const color = deviceColors.purple;

  const handleRegisterWallet = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const { publicKey } = await getNewWebauthnKey(rootkeyPasskeyName);
      const tempPassword = crypto.getRandomValues(new Uint16Array(32));
      const [pubKey, privateKey] = await kadenaGenKeypairFromSeed(
        tempPassword,
        await kadenaEncrypt(
          tempPassword,
          await crypto.subtle.digest('sha-512', Buffer.from(publicKey)),
        ),
        0,
      );

      const decrypted = await kadenaDecrypt(tempPassword, privateKey);
      setKeypair({
        publicKey: pubKey,
        secretKey: Buffer.from(decrypted).toString('hex'),
      });
    } catch (e) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await registerNewDevice(registerAccount, (account) => {
        setSuccesfulAuthentication(true);
        setAccount(account);
        setCurrentAccount(account);
        setCurrentAccountName(account.accountName);
        setAllowRedirect(true);
      })({
        alias: `${alias} (${getNetworkDisplayName(currentNetwork)})`,
        domain: host,
        color,
        chainId,
        networkId: currentNetwork,
        keypair,
      });
    } catch (error: any) {
      addNotification({
        variant: 'error',
        title: 'Could not create an account',
        message: error?.message || 'Please try again later...',
        timeout: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    allowRedirect,
    isSubmitting,
    succesfulAuthentication,
    handleSubmit,
    handleRegisterWallet,
    keypair,
    account,
  };
};

export default function Registration({
  redirectUrl,
  networkId,
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
      onCancel={handleCancel}
      onSubmit={handleSubmit}
      onComplete={handleComplete}
      onHandleRegisterWallet={handleRegisterWallet}
    />
  );
}
const RegisterComponent = ({
  account,
  keypair,
  isSubmitting,
  succesfulAuthentication,
  onCancel,
  onHandleRegisterWallet,
  onSubmit,
  onComplete,
}: {
  account?: Account;
  keypair?: KeyPair;
  isSubmitting: boolean;
  succesfulAuthentication: boolean;
  onCancel: () => void;
  onHandleRegisterWallet: () => void;
  onSubmit: () => void;
  onComplete: () => void;
}) => {
  const [isAnimationFinished, setAnimationFinished] = useState(false);

  if (account && isAnimationFinished)
    return (
      <CardContainer>
        <SpireKeyCardContentBlock
          title="Register"
          description="your account with a passkey"
        >
          <div className={styles.card}>
            <Card
              color={deviceColors.purple}
              balancePercentage={50}
              title={<Alias title={account.alias.replace(/\(.*\)/, '')} />}
              icons={<DeviceIcons account={account} />}
              center={<AccountNetwork account={account} isLoading={true} />}
              cardBottom={<CardBottom account={account} />}
            />
          </div>
        </SpireKeyCardContentBlock>
        <CardFooter>
          <Button variant="outlined" onPress={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" onPress={onComplete}>
            Complete
          </Button>
        </CardFooter>
      </CardContainer>
    );

  if (keypair)
    return (
      <CardContainer>
        <CardContentBlock
          visual={
            <SpireKeyKdacolorLogoGreen
              aria-label="SpireKey"
              fontSize={token('typography.fontSize.9xl')}
            />
          }
          title="Register Account"
          description={
            <>
              <Text>
                Create your account to manage your web3 assets managed by your
                SpireKey wallet.
              </Text>
              <Stepper>
                <Step>Create Wallet</Step>
                <Step active>Register Account</Step>
              </Stepper>
            </>
          }
        >
          <div className={styles.card}>
            <PasskeyCard
              isInProgress={!succesfulAuthentication && isSubmitting}
              isSuccessful={succesfulAuthentication}
              onSuccessfulAnimationEnd={() => setAnimationFinished(true)}
              onSubmit={onSubmit}
            />
          </div>
        </CardContentBlock>
        <CardFooter>
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
        </CardFooter>
      </CardContainer>
    );
  return (
    <CardContainer>
      <CardContentBlock
        visual={
          <SpireKeyKdacolorLogoGreen
            aria-label="SpireKey"
            fontSize={token('typography.fontSize.9xl')}
          />
        }
        title="Connect Wallet"
        description={
          <>
            <Text>
              Do you wish to manage your wallet here on SpireKey? This will
              become your home of operation, your gateway into the a secure web
              3 experience!
            </Text>
            <Stepper>
              <Step active>Create Wallet</Step>
              <Step>Register Account</Step>
            </Stepper>
          </>
        }
      >
        <Stack flexDirection="column" gap="md">
          <Heading as="h5">No wallet yet?</Heading>
          <Text>
            Create a new wallet using a passkey. This passkey will be stored on
            your device as <Text bold>{rootkeyPasskeyName}</Text>.
          </Text>
          <Text>
            This passkey will be used to perform maintenance operations as well
            as recovery operations. SpireKey will not use this key for signing!
          </Text>
        </Stack>
      </CardContentBlock>
      <CardFooter>
        <Button onPress={onHandleRegisterWallet}>Create</Button>
      </CardFooter>
    </CardContainer>
  );
};
