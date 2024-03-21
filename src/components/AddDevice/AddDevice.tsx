'use client';

import { addDevice } from '@/app/register/addDevice';
import { Button } from '@/components/shared/Button/Button';
import { useAccounts, type Device } from '@/context/AccountsContext';
import { useNotifications } from '@/context/shared/NotificationsContext';
import { useAddDeviceForm } from '@/hooks/useAddDeviceForm';
import { deviceColors } from '@/styles/shared/tokens.css';
import { addDeviceOnChain } from '@/utils/addDevice';
import { Box, Heading, Stack, Text } from '@kadena/react-ui';
import { atoms } from '@kadena/react-ui/styles';
import { ICommand } from '@kadena/types';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiometricsForm } from './BiometricsForm';
import { ColorForm } from './ColorForm';
import { DeviceTypeForm } from './DeviceTypeForm';
import * as styles from './styles.css';

const defaultFormData = {
  alias: '',
  networkId: '',
  deviceIndex: 0,
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
}

interface Props {
  caccount: string;
  transaction?: string;
  device?: string;
}

export default function AddDevice({ caccount, transaction, device }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(!!transaction);
  const redirectUrl = '/';
  const { addNotification } = useNotifications();

  const { accounts, setAccount } = useAccounts();
  const account = accounts.find((a) => a.accountName === caccount);

  if (!account) {
    throw new Error('Account does not exist.');
  }

  const [data, setData] = useState<FormData>({
    ...defaultFormData,
    alias: account.alias,
    networkId: account.networkId,
    deviceIndex: account.devices.length + 1,
  });

  const updateFields = (fields: Partial<FormData>) =>
    setData((current) => ({ ...current, ...fields }));

  const returnUrl = (device: Device) =>
    encodeURIComponent(
      `${window.location.href}?device=${Buffer.from(
        JSON.stringify(device),
      ).toString('base64')}`,
    );

  const onSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const signingDevice: Device = account?.devices[0];
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
      `/sign?transaction=${Buffer.from(JSON.stringify(transaction)).toString(
        'base64',
      )}&returnUrl=${returnUrl(deviceToAdd)}`,
    );
  };

  const formStepComponents = [BiometricsForm, DeviceTypeForm, ColorForm];

  const {
    steps,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    next,
    previous,
    goTo,
  } = useAddDeviceForm(formStepComponents, data, onSubmit);

  const decodedRedirectUrl = redirectUrl;
  const cancelRedirectUrl = decodedRedirectUrl || '/welcome';
  const completeRedirectUrl = decodedRedirectUrl || '/';

  const goBack = () => {
    if (currentStepIndex === 0) {
      router.push(cancelRedirectUrl);
    }
    previous();
  };

  useEffect(() => {
    if (!transaction) return;

    const sendTransaction = async () => {
      const tx: ICommand = JSON.parse(
        Buffer.from(transaction, 'base64').toString(),
      );
      try {
        const result = await addDeviceOnChain(tx);
        if (result.result.status !== 'success') {
          addNotification({
            variant: 'error',
            title:
              'Something went wrong while adding the device to your account on chain.',
            message: JSON.stringify(result.result.error),
          });
          return;
        }
        account.devices.push(
          JSON.parse(Buffer.from(device || '{}', 'base64').toString()),
        );
        setAccount(account);
        router.push('/');
      } catch (error: unknown) {
        if (error instanceof Error) {
          addNotification({
            variant: 'error',
            title: 'Failed to add the device to your account on chain.',
            message: error.message,
          });
        }
      }
    };

    sendTransaction();
  }, [transaction]);

  return (
    <>
      <Heading>Add Device</Heading>
      {!!transaction && <Text>Adding device to your account on chain.</Text>}
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
