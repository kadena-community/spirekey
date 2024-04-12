import fingerprint from '@/assets/images/fingerprint.svg';
import { SurfaceCard } from '@/components/SurfaceCard/SurfaceCard';
import { useAccounts } from '@/context/AccountsContext';
import { useNotifications } from '@/context/shared/NotificationsContext';
import { deviceColors } from '@/styles/shared/tokens.css';
import { getAccountNameFromRegisterDeviceEvent } from '@/utils/getAccountNameFromRegisterDeviceEvent';
import { getChainwebDataUrl } from '@/utils/getChainwebDataUrl';
import { getAccountFrom } from '@/utils/shared/account';
import { Stack, Text } from '@kadena/react-ui';
import { ChainId } from '@kadena/types';
import { startAuthentication } from '@simplewebauthn/browser';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { StepProps } from './Recover';
import { animationVariants } from './animation';

export const PasskeyForm: FC<StepProps> = ({
  stepIndex,
  isVisible,
  formValues,
  navigation,
}) => {
  const { handleSubmit } = useForm();
  const { addNotification } = useNotifications();
  const { setAccount } = useAccounts();

  const onSubmit = async () => {
    let authResult;

    try {
      authResult = await startAuthentication({
        challenge: 'doesnotreallymatter',
        rpId: window.location.hostname,
      });
    } catch (error: unknown) {
      addNotification({
        variant: 'error',
        title: 'Authentication failed',
        message: error instanceof Error ? error.message : 'Unknown error.',
        timeout: 5000,
      });
      return;
    }

    const userHandle = authResult.response.userHandle;

    if (!userHandle) {
      addNotification({
        variant: 'error',
        title: 'Failed to recover account',
        message: 'Could not retrieve user handle from passkey.',
        timeout: 5000,
      });
      return;
    }

    const alias = userHandle.split('(')[0].trim();

    const networkId = formValues.networkId;
    const domain = getChainwebDataUrl(networkId);

    let accountName;

    try {
      accountName = await getAccountNameFromRegisterDeviceEvent(
        domain,
        authResult.id,
      );
    } catch (error: unknown) {
      addNotification({
        variant: 'error',
        title: 'Failed to recover account',
        message: error instanceof Error ? error.message : 'Unknown error.',
        timeout: 5000,
      });
      return;
    }

    let account;

    try {
      account = await getAccountFrom({
        accountName,
        networkId,
        chainIds: [process.env.CHAIN_ID], // @ TODO check all chains(?)
      });
    } catch (error: unknown) {
      addNotification({
        variant: 'error',
        title: 'Failed retrieve account data from chain',
        message: error instanceof Error ? error.message : 'Unknown error.',
        timeout: 5000,
      });
      return;
    }

    setAccount({
      ...account,
      alias: alias || '',
      devices: account.devices.map((device) => {
        const deviceName = device.name?.includes('_') ? device.name : '_';
        return {
          ...device,
          deviceType: deviceName.split('_')[0] || 'phone',
          color: deviceName.split('_')[1] || deviceColors.purple,
        };
      }),
      balance: account.balance,
      chainId: process.env.CHAIN_ID as ChainId,
    });

    navigation.next();
  };

  return (
    <motion.div
      animate={isVisible ? 'visible' : 'hidden'}
      variants={animationVariants}
    >
      <form id={`recover-form-${stepIndex}`} onSubmit={handleSubmit(onSubmit)}>
        <SurfaceCard
          title="Passkey"
          description="Select the passkey linked to the device you want to recover."
          onClick={() => onSubmit()}
        >
          <Stack
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            gap="xs"
          >
            <Image src={fingerprint} alt="fingerprint icon" />
            <Text variant="ui">Tap to continue</Text>
          </Stack>
        </SurfaceCard>
      </form>
    </motion.div>
  );
};
