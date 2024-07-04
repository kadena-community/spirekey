'use client';

import type { ChainId } from '@kadena/client';
import { Button, PressEvent, Stack, Text } from '@kadena/kode-ui';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { LayoutSurface } from '@/components/LayoutSurface/LayoutSurface';
import {
  AccountRegistration,
  RegisterAccountFn,
  useAccounts,
} from '@/context/AccountsContext';
import { useSettings } from '@/context/SettingsContext';
import { useNotifications } from '@/context/shared/NotificationsContext';
import { useReturnUrl } from '@/hooks/shared/useReturnUrl';
import { deviceColors } from '@/styles/shared/tokens.css';
import { countWithPrefixOnDomain } from '@/utils/countAccounts';
import { getNetworkDisplayName } from '@/utils/getNetworkDisplayName';
import { getAccountName } from '@/utils/register';
import { getDevnetNetworkId } from '@/utils/shared/getDevnetNetworkId';
import { getNewWebauthnKey } from '@/utils/webauthnKey';

import PasskeyCard from '../Card/PasskeyCard';
import * as styles from './Registration.css';

interface Props {
  redirectUrl?: string;
  networkId?: string;
  chainId?: ChainId;
}

export const registerNewDevice =
  (registerAccount: RegisterAccountFn) =>
  async ({
    alias,
    networkId,
    chainId,
    color,
    domain,
  }: Omit<
    AccountRegistration,
    'accountName' | 'credentialPubkey' | 'deviceType' | 'credentialId'
  >): Promise<AccountRegistration> => {
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
    await registerAccount(account);
    return account;
  };

type UseRegistration = {
  chainId?: ChainId;
  networkId?: string;
  redirectUrl?: string;
};
const useRegistration = ({
  chainId,
  networkId,
  redirectUrl,
}: UseRegistration) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [allowRedirect, setAllowRedirect] = useState<boolean>(false);
  const [animationFinished, setAnimationFinished] = useState<boolean>(false);
  const [currentAccountName, setCurrentAccountName] = useState<string>('');
  const [succesfulAuthentication, setSuccesfulAuthentication] =
    useState<boolean>(false);

  const router = useRouter();
  const { registerAccount, accounts } = useAccounts();
  const { host } = useReturnUrl();
  const { addNotification } = useNotifications();

  const decodedRedirectUrl = decodeURI(redirectUrl || '');
  const cancelRedirectUrl = decodedRedirectUrl || '/welcome';
  const completeRedirectUrl = decodedRedirectUrl || '/';

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

  useEffect(() => {
    if (!allowRedirect || !animationFinished) return;
    setTimeout(() => router.push(completeRedirectUrl), 3000);
  }, [animationFinished, allowRedirect]);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const acc = await registerNewDevice(registerAccount)({
        alias: `${alias} (${getNetworkDisplayName(currentNetwork)})`,
        domain: host,
        color,
        chainId,
        networkId: currentNetwork,
      });
      setCurrentAccountName(acc.accountName);
      setAllowRedirect(true);
      setSuccesfulAuthentication(true);
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

  const handleCancel = () => {
    router.push(cancelRedirectUrl);
  };
  return {
    allowRedirect,
    isSubmitting,
    completeRedirectUrl,
    succesfulAuthentication,
    handleCancel,
    handleSubmit,
    setAnimationFinished,
  };
};

export default function Registration({
  redirectUrl,
  networkId,
  chainId,
}: Props) {
  const {
    allowRedirect,
    isSubmitting,
    completeRedirectUrl,
    succesfulAuthentication,
    handleCancel,
    handleSubmit,
    setAnimationFinished,
  } = useRegistration({ redirectUrl, networkId, chainId });
  return (
    <RegisterComponent
      redirectMessage={
        allowRedirect
          ? `Redirecting you back to ${completeRedirectUrl}`
          : undefined
      }
      isSubmitting={isSubmitting}
      succesfulAuthentication={succesfulAuthentication}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
      onAnimationFinished={setAnimationFinished}
    />
  );
}
const RegisterComponent = ({
  redirectMessage,
  isSubmitting,
  succesfulAuthentication,
  onCancel,
  onSubmit,
  onAnimationFinished,
}: {
  redirectMessage?: string;
  isSubmitting: boolean;
  succesfulAuthentication: boolean;
  onCancel: (e: PressEvent) => void;
  onSubmit: (e: PressEvent) => void;
  onAnimationFinished: (isFinished: boolean) => void;
}) => {
  return (
    <LayoutSurface title="Register" subtitle="your account with a passkey">
      <div className={styles.card}>
        <PasskeyCard
          isInProgress={isSubmitting}
          isSuccessful={succesfulAuthentication}
          onSuccessfulAnimationEnd={() => onAnimationFinished(true)}
        >
          {redirectMessage && (
            <Text className={styles.redirectMessage}>{redirectMessage}</Text>
          )}
        </PasskeyCard>
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
