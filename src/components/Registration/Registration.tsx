'use client';

import { Button } from '@/components/shared/Button/Button';
import { useAccounts } from '@/context/AccountsContext';
import { useReturnUrl } from '@/hooks/shared/useReturnUrl';
import { useRegistrationForm } from '@/hooks/useRegistrationForm';
import { deviceColors } from '@/styles/shared/tokens.css';
import { getDevnetNetworkId } from '@/utils/shared/getDevnetNetworkId';
import { Box, Stack } from '@kadena/react-ui';
import { atoms } from '@kadena/react-ui/styles';
import { ChainId } from '@kadena/types';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DeviceCard from '../Card/DeviceCard';
import { AliasForm } from './AliasForm';
import { BiometricsForm } from './BiometricsForm';
import { ColorForm } from './ColorForm';
import { DeviceTypeForm } from './DeviceTypeForm';
import { NetworkIdForm } from './NetworkIdForm';
import * as styles from './styles.css';

const skipNetworkId =
  process.env.WALLET_NETWORK_ID &&
  typeof window !== 'undefined' &&
  localStorage.getItem('devMode') !== 'true';

const defaultFormData = {
  alias: '',
  usedAlias: '',
  networkId: skipNetworkId
    ? process.env.WALLET_NETWORK_ID!
    : getDevnetNetworkId(),
  accountName: '',
  credentialPubkey: '',
  credentialId: '',
  deviceType: 'security-key',
  color: deviceColors.purple,
};

export type FormData = typeof defaultFormData;

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
  chainId: ChainId;
}

interface Props {
  redirectUrl?: string;
  networkId?: string;
  chainIds?: ChainId[];
}

export default function Registration({
  redirectUrl,
  networkId,
  chainIds = [process.env.CHAIN_ID],
}: Props) {
  const router = useRouter();
  const { registerAccount } = useAccounts();
  const { host } = useReturnUrl();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [data, setData] = useState<FormData>({
    ...defaultFormData,
    networkId: networkId || defaultFormData.networkId,
  });

  const updateFields = (fields: Partial<FormData>) =>
    setData((current) => ({ ...current, ...fields }));

  const onSubmit = async () => {
    // the form was submitted on the last step, so create an account locally and on chain
    if (isSubmitting) return;
    setIsSubmitting(true);

    await registerAccount({
      alias: data.alias,
      color: data.color,
      deviceType: data.deviceType,
      credentialPubkey: data.credentialPubkey,
      credentialId: data.credentialId,
      domain: host,
      networkId: data.networkId,
      chainIds,
    });

    router.push(completeRedirectUrl);
  };

  const formStepComponents = skipNetworkId
    ? [AliasForm, BiometricsForm, DeviceTypeForm, ColorForm]
    : [AliasForm, NetworkIdForm, BiometricsForm, DeviceTypeForm, ColorForm];

  const {
    steps,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    next,
    previous,
    goTo,
  } = useRegistrationForm(formStepComponents, data, onSubmit);

  const decodedRedirectUrl = redirectUrl
    ? Buffer.from(redirectUrl, 'base64').toString()
    : '';
  const cancelRedirectUrl = decodedRedirectUrl || '/welcome';
  const completeRedirectUrl = decodedRedirectUrl || '/';

  const goBack = () => {
    if (currentStepIndex === 0) {
      router.push(cancelRedirectUrl);
    }
    previous();
  };

  return (
    <Stack flexDirection="column" gap="md">
      <Box width="100%" padding="lg">
        <DeviceCard
          color={data.color}
          account={{
            alias: data.alias,
            accountName: data.accountName,
            balance: '0',
            networkId: data.networkId,
            devices: [
              {
                'credential-id': data.credentialId,
                domain: host,
                color: data.color,
                deviceType: data.deviceType,
                guard: {
                  keys: [data.credentialPubkey],
                  pred: 'keys-any',
                },
              },
            ],
          }}
          isLoading
        />
      </Box>

      <div className={styles.wrapper}>
        <motion.div
          animate={{ x: `-${currentStepIndex * 100}%` }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className={styles.container}
        >
          {steps.map((FormStep, stepIndex) => (
            <Box className={styles.step} key={stepIndex}>
              <FormStep
                key={stepIndex}
                stepIndex={stepIndex}
                isVisible={currentStepIndex === stepIndex}
                defaultValues={defaultFormData}
                formValues={data}
                updateFields={updateFields}
                navigation={{ next, previous, goTo }}
                chainId={chainIds[0]}
              />
            </Box>
          ))}
        </motion.div>
      </div>

      {!isSubmitting && (
        <Stack flexDirection="row" gap="xl" marginBlock="lg" paddingInline="lg">
          <Button
            variant="secondary"
            onPress={goBack}
            className={atoms({ flex: 1 })}
          >
            {isFirstStep ? 'Cancel' : 'Previous'}
          </Button>

          <Button
            form={`registration-form-${currentStepIndex}`}
            variant="progress"
            progress={((currentStepIndex + 1) / steps.length) * 100}
            className={atoms({ flex: 1 })}
            type="submit"
          >
            {isLastStep ? 'Complete' : 'Next'}
          </Button>
        </Stack>
      )}
    </Stack>
  );
}
