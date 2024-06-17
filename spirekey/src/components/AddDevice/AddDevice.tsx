'use client';

import type { Account, Device } from '@kadena-spirekey/types';
import type { ICommand } from '@kadena/client';
import { Box, ProgressCircle, Stack } from '@kadena/react-ui';
import { atoms } from '@kadena/react-ui/styles';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { SurfaceCard } from '@/components/SurfaceCard/SurfaceCard';
import { Button } from '@/components/shared/Button/Button';
import { useAccounts } from '@/context/AccountsContext';
import { useNotifications } from '@/context/shared/NotificationsContext';
import { useAddDeviceForm } from '@/hooks/useAddDeviceForm';
import { deviceColors } from '@/styles/shared/tokens.css';
import { addDevice } from '@/utils/device';
import {
  addDeviceTranslations,
  objectParameterValue,
  returnUrlWithDevice,
  searchParamsToString,
} from '@/utils/searchParameters';
import { submitTransaction } from '@/utils/submitTransaction';

import { ColorForm } from './ColorForm';
import { DeviceTypeForm } from './DeviceTypeForm';
import { PasskeyForm } from './PasskeyForm';
import { SigningDeviceForm } from './SigningDeviceForm';

import * as styles from './styles.css';

const defaultFormData = {
  alias: '',
  networkId: '',
  deviceIndex: 0,
  credentialPubkey: '',
  credentialId: '',
  deviceType: 'security-key',
  color: deviceColors.purple,
  signingDeviceCredentialId: '',
};

export type FormData = typeof defaultFormData;

export interface StepProps {
  stepIndex: number;
  isVisible: boolean;
  defaultValues: FormData;
  updateFields: (fields: Partial<FormData>) => void;
  formValues: FormData;
  account: Account;
  navigation: {
    next: () => void;
    previous: () => void;
    goTo: (index: number) => void;
  };
}

interface Props {
  caccount: string;
  transaction?: ICommand;
  device?: Device;
}

export default function AddDevice({ caccount, transaction, device }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { addNotification } = useNotifications();

  const { accounts, setAccount } = useAccounts();
  const account = accounts.find((a) => a.accountName === caccount);

  if (!account) {
    throw new Error('Account does not exist.');
  }

  defaultFormData.signingDeviceCredentialId =
    account.devices[0]['credential-id'];

  const [data, setData] = useState<FormData>({
    ...defaultFormData,
    alias: account.alias,
    networkId: account.networkId,
    deviceIndex: account.devices.length + 1,
  });

  const updateFields = (fields: Partial<FormData>) =>
    setData((current) => ({ ...current, ...fields }));

  const onSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const signingDevice: Device | undefined = account?.devices.find(
      (d) => d['credential-id'] === data.signingDeviceCredentialId,
    );

    if (!signingDevice) {
      // This condition should never be met in practice
      throw new Error('The signing device does not exist on this account.');
    }

    const deviceToAdd: Device = {
      ...signingDevice,
      color: data.color,
      deviceType: data.deviceType,
      ['credential-id']: data.credentialId,
      guard: {
        keys: [data.credentialPubkey],
        pred: 'keys-any',
      },
    };

    const transaction = await addDevice(signingDevice, account, deviceToAdd);

    router.push(
      `/sign?${searchParamsToString({
        transaction: objectParameterValue(transaction),
        returnUrl: returnUrlWithDevice(
          window.location.href,
          deviceToAdd,
          false,
        ),
        translations: addDeviceTranslations(deviceToAdd),
      })}`,
    );
  };

  const formStepComponents = [
    SigningDeviceForm,
    PasskeyForm,
    DeviceTypeForm,
    ColorForm,
  ];

  const {
    steps,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    next,
    previous,
    goTo,
  } = useAddDeviceForm(formStepComponents, data, onSubmit);

  const goBack = () => {
    if (currentStepIndex === 0) {
      router.push('/');
    }
    previous();
  };

  useEffect(() => {
    if (!transaction || !device) return;

    const sendTransaction = async () => {
      try {
        const pendingTransaction = await submitTransaction(transaction);
        device.pendingRegistrationTx = pendingTransaction.requestKey;
        account.devices.push(device);
        setAccount(account);
        router.push('/');
      } catch (error: unknown) {
        if (error instanceof Error) {
          addNotification({
            variant: 'error',
            title:
              'Failed to send transaction for adding the device to your account.',
            message: error.message,
          });
        }
      }
    };

    sendTransaction();
  }, [transaction]);

  return (
    <>
      {!!transaction && (
        <Stack flexDirection="column" gap="md" padding="md">
          <SurfaceCard
            title="Adding your device"
            description="Submitting the transaction to the blockchain."
          >
            <Stack
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              gap="xs"
            >
              <ProgressCircle
                color="inherit"
                isIndeterminate
                label="Progress"
                maxValue={100}
                minValue={0}
                size="md"
                value={25}
              />
            </Stack>
          </SurfaceCard>
        </Stack>
      )}
      {!transaction && (
        <Stack flexDirection="column" gap="md">
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
                    account={account}
                    updateFields={updateFields}
                    navigation={{ next, previous, goTo }}
                  />
                </Box>
              ))}
            </motion.div>
          </div>

          {!isSubmitting && (
            <Stack
              flexDirection="row"
              gap="xl"
              marginBlock="lg"
              paddingInline="lg"
            >
              <Button
                variant="secondary"
                onPress={goBack}
                className={atoms({ flex: 1 })}
              >
                {isFirstStep ? 'Cancel' : 'Previous'}
              </Button>

              <Button
                form={`add-device-form-${currentStepIndex}`}
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
      )}
    </>
  );
}
