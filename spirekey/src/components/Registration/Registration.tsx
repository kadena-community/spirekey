'use client';

import type { ChainId } from '@kadena/client';
import { Button } from '@kadena/kode-ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
  CardFooter,
  SpireKeyCardContentBlock,
} from '@/components/CardPattern/CardPattern';
import { useRAccount } from '@/flags/flags';
import { getUser } from '@/utils/connect';
import { genKeyPair } from '@kadena/cryptography-utils';
import { Account } from '@kadena/spirekey-types';
import AccountNetwork from '../Card/AccountNetwork';
import Alias from '../Card/Alias';
import Card from '../Card/Card';
import CardBottom from '../Card/CardBottom';
import DeviceIcons from '../Card/DeviceIcons';
import PasskeyCard from '../Card/PasskeyCard';
import * as styles from './Registration.css';

interface Props {
  redirectUrl?: string;
  networkId?: string;
  chainId?: ChainId;
  onComplete?: (account: Account) => void;
  onCancel?: () => void;
}

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
  }: Omit<
    AccountRegistration,
    'accountName' | 'credentialPubkey' | 'deviceType' | 'credentialId'
  >): Promise<void> => {
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
      const keypair = genKeyPair();
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
  const { account, isSubmitting, succesfulAuthentication, handleSubmit } =
    useRegistration({
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
      onCancel={handleCancel}
      onSubmit={handleSubmit}
      onComplete={handleComplete}
    />
  );
}
const RegisterComponent = ({
  account,
  isSubmitting,
  succesfulAuthentication,
  onCancel,
  onSubmit,
  onComplete,
}: {
  account?: Account;
  isSubmitting: boolean;
  succesfulAuthentication: boolean;
  onCancel: () => void;
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

  return (
    <CardContainer>
      <SpireKeyCardContentBlock
        title="Register"
        description="your account with a passkey"
      >
        <div className={styles.card}>
          <PasskeyCard
            isInProgress={!succesfulAuthentication && isSubmitting}
            isSuccessful={succesfulAuthentication}
            onSuccessfulAnimationEnd={() => setAnimationFinished(true)}
            onSubmit={onSubmit}
          />
        </div>
      </SpireKeyCardContentBlock>
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
};
