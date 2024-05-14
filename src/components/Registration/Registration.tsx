'use client';

import fingerprint from '@/assets/images/fingerprint.svg';
import { Button } from '@/components/shared/Button/Button';
import { useAccounts } from '@/context/AccountsContext';
import { useSettings } from '@/context/SettingsContext';
import { useNotifications } from '@/context/shared/NotificationsContext';
import { useReturnUrl } from '@/hooks/shared/useReturnUrl';
import { deviceColors } from '@/styles/shared/tokens.css';
import { getNetworkDisplayName } from '@/utils/getNetworkDisplayName';
import { getAccountName } from '@/utils/register';
import { getDevnetNetworkId } from '@/utils/shared/getDevnetNetworkId';
import { getNewWebauthnKey } from '@/utils/webauthnKey';
import { Box, Stack, Text } from '@kadena/react-ui';
import { atoms } from '@kadena/react-ui/styles';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import DeviceCard from '../Card/DeviceCard';
import { SurfaceCard } from '../SurfaceCard/SurfaceCard';
import { NetworkDevnet } from '../icons/NetworkDevnet';
import { NetworkMainnet } from '../icons/NetworkMainnet';
import { NetworkTestnet } from '../icons/NetworkTestnet';
import * as styles from './styles.css';

interface Props {
  redirectUrl?: string;
  networkId?: string;
}

export default function Registration({ redirectUrl, networkId }: Props) {
  const router = useRouter();
  const { registerAccount, accounts } = useAccounts();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { host } = useReturnUrl();
  const { devMode } = useSettings();
  const { addNotification } = useNotifications();
  const accountPrefix = 'SpireKey Account';

  const skipNetworkId = process.env.WALLET_NETWORK_ID && !devMode;
  const defaultFormData = {
    networkId: skipNetworkId
      ? process.env.WALLET_NETWORK_ID!
      : getDevnetNetworkId(),
    accountName: '',
    credentialPubkey: '',
    credentialId: '',
  };

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: defaultFormData,
  });

  const currentNetwork = watch('networkId');
  const currentAccountName = watch('accountName');
  const currentCredentialPubkey = watch('credentialPubkey');
  const currentCredentialId = watch('credentialId');

  const numberOfSpireKeyAccounts = accounts.filter(
    (account) =>
      account.alias.startsWith(accountPrefix) &&
      account.accountName !== currentAccountName,
  ).length;

  const alias = `${accountPrefix} ${numberOfSpireKeyAccounts + 1}`;
  const deviceType = 'security-key';
  const color = deviceColors.purple;

  const onSubmit: SubmitHandler<typeof defaultFormData> = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    let accountName = '';
    const { credentialId, publicKey } = await getNewWebauthnKey(
      `${alias} (${getNetworkDisplayName(currentNetwork)})`,
    );
    try {
      accountName = await getAccountName(publicKey, currentNetwork);
      setValue('accountName', accountName);
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

    await registerAccount({
      accountName,
      alias,
      color,
      deviceType,
      credentialPubkey: publicKey,
      credentialId,
      domain: host,
      networkId: currentNetwork,
    });

    router.push(completeRedirectUrl);
  };

  const decodedRedirectUrl = redirectUrl
    ? Buffer.from(redirectUrl, 'base64').toString()
    : '';
  const cancelRedirectUrl = decodedRedirectUrl || '/welcome';
  const completeRedirectUrl = decodedRedirectUrl || '/';

  const handleCancelClick = () => {
    router.push(cancelRedirectUrl);
  };

  const getDescription = () => {
    const dev = ' For development purposes only';

    return (
      <Text>
        <Text className={styles.descriptionEmphasis}>
          {getNetworkDisplayName(currentNetwork)}
        </Text>{' '}
        selected.
        {['testnet04', 'fast-development', 'development'].includes(
          currentNetwork,
        )
          ? dev
          : ''}
      </Text>
    );
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
            chainIds: [process.env.CHAIN_ID],
            devices: [
              {
                'credential-id': currentCredentialId,
                domain: host,
                color,
                deviceType,
                guard: {
                  keys: [currentCredentialPubkey],
                  pred: 'keys-any',
                },
              },
            ],
          }}
          isLoading
        />
      </Box>

      <form id="registration-form">
        <Stack flexDirection="column" gap="md" paddingInline="lg">
          {!skipNetworkId && (
            <SurfaceCard
              title="Network"
              description={
                <>
                  {getDescription()}
                  {errors.networkId && (
                    <Box style={{ color: 'red' }}>
                      {errors.networkId.message}
                    </Box>
                  )}
                </>
              }
            >
              <div className={styles.itemContainer}>
                <div>
                  <input
                    {...register('networkId', {
                      required: 'Please select a network',
                    })}
                    aria-label="Mainnet"
                    type="radio"
                    value="mainnet01"
                    id="network-mainnet"
                  />
                  <label htmlFor="network-mainnet" className={styles.item}>
                    <NetworkMainnet />
                    <span>Mainnet</span>
                  </label>
                </div>
                <div>
                  <input
                    {...register('networkId', {
                      required: 'Please select a network',
                    })}
                    aria-label="Testnet"
                    type="radio"
                    value="testnet04"
                    id="network-testnet"
                  />
                  <label htmlFor="network-testnet" className={styles.item}>
                    <NetworkTestnet />
                    <span>Testnet</span>
                  </label>
                </div>
                <div>
                  <input
                    {...register('networkId', {
                      required: 'Please select a network',
                    })}
                    aria-label="Devnet"
                    type="radio"
                    value={getDevnetNetworkId()}
                    id="network-devnet"
                  />
                  <label htmlFor="network-devnet" className={styles.item}>
                    <NetworkDevnet />
                    <span>Devnet</span>
                  </label>
                </div>
              </div>
            </SurfaceCard>
          )}
          <SurfaceCard
            title="Passkey"
            description={
              isSubmitting
                ? 'Your account is being created'
                : 'Create your account with a Passkey'
            }
            onClick={handleSubmit(onSubmit)}
          >
            <Stack
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              gap="xs"
            >
              <Image
                src={fingerprint}
                alt="fingerprint icon"
                width={64}
                height={64}
              />
              <Text variant="ui">Tap to continue</Text>
            </Stack>
            <input type="hidden" required {...register('credentialPubkey')} />
            <input type="hidden" required {...register('credentialId')} />
            <input type="hidden" required {...register('accountName')} />
          </SurfaceCard>
        </Stack>
      </form>

      {!isSubmitting && (
        <Stack flexDirection="row" gap="xl" marginBlock="lg" paddingInline="lg">
          <Button
            variant="secondary"
            onPress={handleCancelClick}
            className={atoms({ flex: 1 })}
            isDisabled={isSubmitting}
          >
            Cancel
          </Button>
        </Stack>
      )}
    </Stack>
  );
}
