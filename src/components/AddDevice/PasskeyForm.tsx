import fingerprint from '@/assets/images/fingerprint.svg';
import { SurfaceCard } from '@/components/SurfaceCard/SurfaceCard';
import { getNetworkDisplayName } from '@/utils/getNetworkDisplayName';
import { getNewWebauthnKey } from '@/utils/webauthnKey';
import { Stack, Text } from '@kadena/react-ui';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { StepProps } from './AddDevice';
import { animationVariants } from './animation';

export const PasskeyForm: FC<StepProps> = ({
  stepIndex,
  isVisible,
  updateFields,
  formValues,
  navigation,
}) => {
  const { handleSubmit, register } = useForm();

  const onSubmit = async () => {
    const { credentialId, publicKey } = await getNewWebauthnKey(
      `${formValues.alias} (${getNetworkDisplayName(formValues.networkId)}) ${formValues.deviceIndex}`,
    );
    updateFields({
      credentialId,
      credentialPubkey: publicKey,
    });
    navigation.next();
  };

  return (
    <motion.div
      animate={isVisible ? 'visible' : 'hidden'}
      variants={animationVariants}
    >
      <form
        id={`add-device-form-${stepIndex}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <SurfaceCard
          title="Passkey"
          description="Create a passkey to secure your account"
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
          <input type="hidden" required {...register('credentialPubkey')} />
          <input type="hidden" required {...register('credentialId')} />
        </SurfaceCard>
      </form>
    </motion.div>
  );
};
