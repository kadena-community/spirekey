import fingerprint from '@/assets/images/fingerprint.svg';
import { SurfaceCard } from '@/components/SurfaceCard/SurfaceCard';
import { useNotifications } from '@/context/shared/NotificationsContext';
import { getNetworkDisplayName } from '@/utils/getNetworkDisplayName';
import { getAccountName } from '@/utils/register';
import { getNewWebauthnKey } from '@/utils/webauthnKey';
import { Stack, Text } from '@kadena/react-ui';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { StepProps } from './Registration';
import { animationVariants } from './animation';
import * as styles from './styles.css';

export const BiometricsForm: FC<StepProps> = ({
  stepIndex,
  isVisible,
  updateFields,
  formValues,
  navigation,
}) => {
  const { handleSubmit, register } = useForm();
  const { addNotification } = useNotifications();

  const onSubmit = async () => {
    const { credentialId, publicKey } = await getNewWebauthnKey(
      `${formValues.alias} (${getNetworkDisplayName(formValues.networkId)})`,
    );
    try {
      const accountName = await getAccountName(publicKey, formValues.networkId);
      updateFields({
        accountName,
        credentialId,
        credentialPubkey: publicKey,
        usedAlias: formValues.alias,
      });
      navigation.next();
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

  return (
    <motion.div
      animate={isVisible ? 'visible' : 'hidden'}
      variants={animationVariants}
    >
      <form
        id={`registration-form-${stepIndex}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <SurfaceCard
          title="Passkey"
          description="Create your account by using Passkey"
          onClick={() => onSubmit()}
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
            <Text variant="smallest">Tap to continue</Text>
          </Stack>
          <input type="hidden" required {...register('credentialPubkey')} />
          <input type="hidden" required {...register('credentialId')} />
          <input type="hidden" required {...register('accountName')} />
        </SurfaceCard>
      </form>
    </motion.div>
  );
};
