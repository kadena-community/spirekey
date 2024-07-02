'use client';

import type { ChainId } from '@kadena/client';
import { Button, Stack, Text } from '@kadena/react-ui';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { LayoutSurface } from '@/components/LayoutSurface/LayoutSurface';
import { useAccounts } from '@/context/AccountsContext';
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

export default function Registration() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const [currentAccountName, setCurrentAccountName] = useState<string>('');
  const [succesfulAuthentication, setSuccesfulAuthentication] =
    useState<boolean>(false);

  const router = useRouter();
  const { registerAccount, accounts } = useAccounts();
  const { host } = useReturnUrl();
  const { devMode } = useSettings();
  const { addNotification } = useNotifications();

  const {
    redirectUrl,
    networkId,
    chainId,
  }: { redirectUrl: string; networkId: string; chainId: ChainId } = useParams();

  const accountPrefix = 'SpireKey Account';

  const skipNetworkId = process.env.WALLET_NETWORK_ID && !devMode;
  const currentNetwork =
    networkId ||
    (skipNetworkId ? process.env.WALLET_NETWORK_ID! : getDevnetNetworkId());

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
      var { credentialId, publicKey, deviceType } = await getNewWebauthnKey(
        `${alias} (${getNetworkDisplayName(currentNetwork)})`,
      );
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      return;
    }

    try {
      setSuccesfulAuthentication(true);
      setIsSubmitting(false);
      const accountName = await getAccountName(publicKey, currentNetwork);

      setCurrentAccountName(accountName);

      await registerAccount({
        accountName,
        alias,
        color,
        deviceType,
        credentialPubkey: publicKey,
        credentialId,
        domain: host,
        networkId: currentNetwork,
        chainId,
      });
      completeRedirect();
    } catch (error: unknown) {
      if (error instanceof Error) {
        addNotification({
          variant: 'error',
          title: 'Error getting accountname',
          message: error.message,
          timeout: 5000,
        });
      }
    }
  };

  const completeRedirect = () => {
    if (!decodedRedirectUrl) {
      router.push(completeRedirectUrl);
      return;
    }

    setIsRedirecting(true);
    setTimeout(() => {
      router.push(completeRedirectUrl);
    }, 2000);
  };

  // This should be fixed in another way, risk of side effects
  const decodedRedirectUrl = redirectUrl
    ? Buffer.from(redirectUrl, 'base64').toString()
    : '';
  const cancelRedirectUrl = decodedRedirectUrl || '/welcome';
  const completeRedirectUrl = decodedRedirectUrl || '/';

  const handleCancel = () => {
    router.push(cancelRedirectUrl);
  };

  return (
    <LayoutSurface title="Register" subtitle="your account with a passkey">
      <div className={styles.card}>
        <PasskeyCard
          isInProgress={isSubmitting}
          isSuccessful={succesfulAuthentication}
        >
          {isRedirecting && (
            <Text>Redirecting you back to {completeRedirectUrl}</Text>
          )}
        </PasskeyCard>
      </div>
      <Stack className={styles.buttons}>
        <Button
          variant="outlined"
          onPress={handleCancel}
          isDisabled={isSubmitting || succesfulAuthentication}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onPress={() => handleSubmit()}
          isDisabled={isSubmitting || succesfulAuthentication}
        >
          Continue
        </Button>
      </Stack>
    </LayoutSurface>
  );
}
