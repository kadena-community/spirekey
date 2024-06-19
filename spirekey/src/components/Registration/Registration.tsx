'use client';

import { Button } from '@/components/shared/Button/Button';
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
import { Box, Stack, Text } from '@kadena/react-ui';
import { atoms } from '@kadena/react-ui/styles';
import { ChainId } from '@kadena/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import DeviceCard from '../Card/DeviceCard';
import NetworkId from '../Form/NetworkId/NetworkId';
import Passkey from '../Form/Passkey/Passkey';
import { Surface } from '../Surface/Surface';

interface Props {
  redirectUrl?: string;
  networkId?: string;
  chainId?: ChainId;
}

export default function Registration({
  redirectUrl,
  networkId,
  chainId,
}: Props) {
  const router = useRouter();
  const { registerAccount, accounts } = useAccounts();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const [currentAccountName, setCurrentAccountName] = useState<string>('');
  const { host } = useReturnUrl();
  const { devMode } = useSettings();
  const { addNotification } = useNotifications();
  const accountPrefix = 'SpireKey Account';

  const skipNetworkId = process.env.WALLET_NETWORK_ID && !devMode;
  const defaultFormData = {
    networkId:
      networkId ||
      (skipNetworkId ? process.env.WALLET_NETWORK_ID! : getDevnetNetworkId()),
    accountName: '',
  };

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultFormData,
  });

  const currentNetwork = watch('networkId');

  const numberOfSpireKeyAccounts = countWithPrefixOnDomain(
    accounts,
    accountPrefix,
    host,
    currentAccountName,
  );

  const alias = `${accountPrefix} ${numberOfSpireKeyAccounts + 1}`;
  const deviceType = 'security-key';
  const color = deviceColors.purple;

  const onSubmit: SubmitHandler<typeof defaultFormData> = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const { credentialId, publicKey } = await getNewWebauthnKey(
      `${alias} (${getNetworkDisplayName(currentNetwork)})`,
    );
    try {
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
      setIsSubmitting(false);
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

  const decodedRedirectUrl = redirectUrl
    ? Buffer.from(redirectUrl, 'base64').toString()
    : '';
  const cancelRedirectUrl = decodedRedirectUrl || '/welcome';
  const completeRedirectUrl = decodedRedirectUrl || '/';

  const handleCancelClick = () => {
    router.push(cancelRedirectUrl);
  };

  return (
    <Stack flexDirection="column" gap="md">
      <Box width="100%" padding="lg">
        <DeviceCard
          color={color}
          account={{
            alias,
            accountName: currentAccountName,
            balance: '0',
            networkId: currentNetwork,
            minApprovals: 1,
            minRegistrationApprovals: 1,
            chainIds: [chainId || process.env.CHAIN_ID],
            devices: [
              {
                'credential-id': '',
                domain: host,
                color,
                deviceType,
                guard: {
                  keys: [''],
                  pred: 'keys-any',
                },
              },
            ],
          }}
          isLoading
        />
      </Box>

      {isRedirecting && (
        <Box width="100%" padding="lg">
          <Surface>
            <Stack flexDirection="column" gap="md" margin="xl">
              <Text>Redirecting you back to {completeRedirectUrl}</Text>
            </Stack>
          </Surface>
        </Box>
      )}

      {!isRedirecting && (
        <>
          <form id="registration-form">
            <Stack flexDirection="column" gap="md" paddingInline="lg">
              {!skipNetworkId && (
                <NetworkId
                  networkId={currentNetwork}
                  name="networkId"
                  register={register}
                  error={errors.networkId}
                />
              )}
              <Passkey
                isInProgress={isSubmitting}
                onClick={handleSubmit(onSubmit)}
              />
            </Stack>
          </form>

          <Stack
            flexDirection="row"
            gap="xl"
            marginBlock="lg"
            paddingInline="lg"
          >
            <Button
              variant="secondary"
              onPress={handleCancelClick}
              className={atoms({ flex: 1 })}
            >
              Cancel
            </Button>
          </Stack>
        </>
      )}
    </Stack>
  );
}
