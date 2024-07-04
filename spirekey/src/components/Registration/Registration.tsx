'use client';

import type { ChainId } from '@kadena/client';
import { Button, PressEvent, Stack, Text } from '@kadena/kode-ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { LayoutSurface } from '@/components/LayoutSurface/LayoutSurface';
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
import { getAccountName } from '@/utils/register';
import { getNewWebauthnKey } from '@/utils/webauthnKey';

import { getUser } from '@/utils/connect';
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

    const accountName = await getAccountName(publicKey, networkId);
    const account = {
      networkId,
      credentialId,
      deviceType,
      accountName,
      chainId,
      alias,
      color,
      domain,
      credentialPubkey: publicKey,
    };
    onPasskeyRetrieved({
      accountName,
      networkId,
      alias,
      balance: '0.0',
      chainIds: [chainId || process.env.CHAIN_ID],
      minApprovals: 1,
      minRegistrationApprovals: 1,
      devices: [
        {
          color,
          deviceType,
          guard: {
            keys: [publicKey],
            pred: 'keys-any',
          },
          domain,
          'credential-id': credentialId,
        },
      ],
    });
    registerAccount(account);
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
  const [account, setAccount] = useState<Account>();

  const { registerAccount, accounts } = useAccounts();
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
}: Props) {
  const router = useRouter();
  const decodedRedirectUrl = decodeURI(redirectUrl || '');
  const cancelRedirectUrl = decodedRedirectUrl || '/welcome';
  const completeRedirectUrl = decodedRedirectUrl || '/';
  const handleCancel = () => router.push(cancelRedirectUrl);
  const { account, isSubmitting, succesfulAuthentication, handleSubmit } =
    useRegistration({
      networkId,
      chainId,
    });
  const handleComplete = () => {
    if (!account) throw new Error('No user registered');
    router.push(
      `${completeRedirectUrl}?${new URLSearchParams({ user: Buffer.from(JSON.stringify(getUser(account))).toString('base64') })}`,
    );
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
  onCancel: (e: PressEvent) => void;
  onSubmit: (e: PressEvent) => void;
  onComplete: (e: PressEvent) => void;
}) => {
  const [isAnimationFinished, setAnimationFinished] = useState(false);
  if (account && isAnimationFinished)
    return (
      <LayoutSurface title="Register" subtitle="your account with a passkey">
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
        <Stack className={styles.buttons}>
          <Button variant="outlined" onPress={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" onPress={onComplete}>
            Complete
          </Button>
        </Stack>
      </LayoutSurface>
    );
  return (
    <LayoutSurface title="Register" subtitle="your account with a passkey">
      <div className={styles.card}>
        <PasskeyCard
          isInProgress={!succesfulAuthentication && isSubmitting}
          isSuccessful={succesfulAuthentication}
          onSuccessfulAnimationEnd={() => setAnimationFinished(true)}
        />
      </div>
      <Stack className={styles.buttons}>
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
      </Stack>
    </LayoutSurface>
  );
};
