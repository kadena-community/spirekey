import fingerprint from '@/assets/images/fingerprint.svg';
import { Stack } from '@kadena/react-ui';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { FC, useEffect } from 'react';

import { SurfaceCard } from '@/components/SurfaceCard/SurfaceCard';
import { getAccountName } from '@/utils/register';
import { getNewWebauthnKey } from '@/utils/webauthnKey';
import { useForm } from 'react-hook-form';
import { StepProps } from './Registration';
import { animationVariants } from './animation';

export const BiometricsForm: FC<StepProps> = ({
  stepIndex,
  isVisible,
  updateFields,
  formValues,
  navigation,
}) => {
  const { handleSubmit, register } = useForm();

  const onSubmit = async () => {
    const { credentialId, publicKey } = await getNewWebauthnKey(
      formValues.alias,
    );

    const accountName = await getAccountName(publicKey, formValues.networkId);
    updateFields({
      accountName,
      credentialId,
      credentialPubkey: publicKey,
      usedAlias: formValues.alias,
    });

    navigation.next();
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
          title="Biometrics"
          description="To secure your account we need you to confirm with your biometrics"
          onClick={() => onSubmit()}
        >
          <Stack justifyContent="center" alignItems="center">
            <Image src={fingerprint} alt="fingerprint icon" />
          </Stack>
          <input type="hidden" required {...register('credentialPubkey')} />
          <input type="hidden" required {...register('credentialId')} />
          <input type="hidden" required {...register('accountName')} />
        </SurfaceCard>
      </form>
    </motion.div>
  );
};
