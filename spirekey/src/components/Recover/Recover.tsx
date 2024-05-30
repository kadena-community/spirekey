'use client';

import { Button } from '@/components/shared/Button/Button';
import { useSettings } from '@/context/SettingsContext';
import { useRecoverForm } from '@/hooks/useRecoverForm';
import { getDevnetNetworkId } from '@/utils/shared/getDevnetNetworkId';
import { Box, Stack } from '@kadena/react-ui';
import { atoms } from '@kadena/react-ui/styles';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { NetworkIdForm } from './NetworkIdForm';
import { PasskeyForm } from './PasskeyForm';
import * as styles from './styles.css';

export interface FormData {
  networkId: string;
}

export interface StepProps {
  stepIndex: number;
  isVisible: boolean;
  defaultValues: FormData;
  updateFields: (fields: Partial<FormData>) => void;
  formValues: FormData;
  navigation: {
    next: () => void;
    previous: () => void;
    goTo: (index: number) => void;
  };
}

export default function Recover() {
  const router = useRouter();
  const { devMode } = useSettings();

  const skipNetworkId = process.env.WALLET_NETWORK_ID && devMode;

  const defaultFormData = {
    networkId: skipNetworkId
      ? process.env.WALLET_NETWORK_ID!
      : getDevnetNetworkId(),
  };

  const [data, setData] = useState<FormData>(defaultFormData);

  const updateFields = (fields: Partial<FormData>) =>
    setData((current) => ({ ...current, ...fields }));

  const onSubmit = async () => {
    router.push('/');
  };

  const formStepComponents = skipNetworkId
    ? [PasskeyForm]
    : [NetworkIdForm, PasskeyForm];

  const {
    steps,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    next,
    previous,
    goTo,
  } = useRecoverForm(formStepComponents, data, onSubmit);

  const goBack = () => {
    if (currentStepIndex === 0) {
      router.push('/welcome');
    }
    previous();
  };

  return (
    <Stack flexDirection="column" gap="md">
      <div className={styles.wrapper}>
        <motion.div
          animate={{ x: `-${currentStepIndex * 100}%` }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className={styles.container}
        >
          {steps.map((FormStep, stepIndex) => (
            <Box className={styles.step}>
              <FormStep
                key={stepIndex}
                stepIndex={stepIndex}
                isVisible={currentStepIndex === stepIndex}
                defaultValues={defaultFormData}
                formValues={data}
                updateFields={updateFields}
                navigation={{ next, previous, goTo }}
              />
            </Box>
          ))}
        </motion.div>
      </div>

      <Stack flexDirection="row" gap="xl" marginBlock="lg" paddingInline="lg">
        <Button
          variant="secondary"
          onPress={goBack}
          className={atoms({ flex: 1 })}
        >
          {isFirstStep ? 'Cancel' : 'Previous'}
        </Button>

        <Button
          form={`recover-form-${currentStepIndex}`}
          variant="progress"
          progress={((currentStepIndex + 1) / steps.length) * 100}
          className={atoms({ flex: 1 })}
          type="submit"
        >
          {isLastStep ? 'Complete' : 'Next'}
        </Button>
      </Stack>
    </Stack>
  );
}
