'use client';

import { Button } from '@/components/Button/Button';
import { useAccounts } from '@/context/AccountsContext';
import { useRegistrationForm } from '@/hooks/useRegistrationForm';
import { useReturnUrl } from '@/hooks/useReturnUrl';
import { deviceColors } from '@/styles/tokens.css';
import { getDevnetNetworkId } from '@/utils/getDevnetNetworkId';
import { getAccountName } from '@/utils/register';
import { getNewWebauthnKey } from '@/utils/webauthnKey';
import { Box, Form, Stack } from '@kadena/react-ui';
import { atoms } from '@kadena/react-ui/styles';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import DeviceCard from '../Card/DeviceCard';
import { AliasForm } from './AliasForm';
import { BiometricsForm } from './BiometricsForm';
import { ColorForm } from './ColorForm';
import { DeviceTypeForm } from './DeviceTypeForm';
import { NetworkIdForm } from './NetworkIdForm';
import { step as stepStyle } from './styles.css';

const defaultFormData = {
  alias: '',
  usedAlias: '',
  networkId: getDevnetNetworkId(),
  accountName: '',
  credentialPubkey: '',
  credentialId: '',
  deviceType: 'security-key',
  color: deviceColors.purple,
};

export type FormData = typeof defaultFormData;

export type Direction = 'forward' | 'backward';

export type FormUtils = {
  updateFields: (fields: Partial<FormData>) => void;
  onCredentialCreated?: () => void;
  direction: Direction;
};

type Props = {
  redirectUrl?: string;
};

export default function Registration({ redirectUrl }: Props) {
  const router = useRouter();
  const { registerAccount } = useAccounts();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>('forward');
  const [data, setData] = useState<FormData>(defaultFormData);
  const updateFields = (fields: Partial<FormData>) =>
    setData((current) => ({ ...current, ...fields }));
  const onCredentialCreated = () => next();
  const { host } = useReturnUrl();
  const {
    step,
    steps,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    next,
    previous,
    goTo,
  } = useRegistrationForm([
    <AliasForm {...data} direction={direction} updateFields={updateFields} />,
    <NetworkIdForm
      {...data}
      direction={direction}
      updateFields={updateFields}
    />,
    <BiometricsForm
      {...data}
      direction={direction}
      updateFields={updateFields}
      onCredentialCreated={onCredentialCreated}
    />,
    <DeviceTypeForm
      {...data}
      direction={direction}
      updateFields={updateFields}
    />,
    <ColorForm {...data} direction={direction} updateFields={updateFields} />,
  ]);

  const decodedRedirectUrl = redirectUrl
    ? Buffer.from(redirectUrl, 'base64').toString()
    : '';
  const cancelRedirectUrl = decodedRedirectUrl || '/welcome';
  const completeRedirectUrl = decodedRedirectUrl || '/';

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setDirection('forward');

    if (
      currentStepIndex === 2 &&
      (data.accountName === '' ||
        data.credentialId === '' ||
        data.credentialPubkey === '')
    ) {
      // the form was submitted on the biometrics step without creating webauthn credentials
      const { credentialId, publicKey } = await getNewWebauthnKey(data.alias);
      const accountName = await getAccountName(publicKey, data.networkId);
      updateFields({
        accountName,
        credentialId,
        credentialPubkey: publicKey,
        usedAlias: data.alias,
      });
      return next();
    }

    if (isLastStep) {
      // the form was submitted on the last step, so create an account locally and on chain
      if (isSubmitting) return;
      setIsSubmitting(true);

      await registerAccount({
        caccount: data.accountName,
        alias: data.alias,
        color: data.color,
        deviceType: data.deviceType,
        credentialPubkey: data.credentialPubkey,
        credentialId: data.credentialId,
        domain: host,
        network: data.networkId,
      });

      if (process.env.AUTO_REGISTER_MAINNET === 'true') {
        registerAccount({
          caccount: data.accountName,
          alias: data.alias,
          color: data.color,
          deviceType: data.deviceType,
          credentialPubkey: data.credentialPubkey,
          credentialId: data.credentialId,
          domain: host,
          network: 'mainnet01',
        });
      }

      router.push(completeRedirectUrl);

      return;
    }

    if (currentStepIndex === 1 && data.usedAlias === data.alias) {
      // skip the fingerprint step if the currently filled in alias is the same as the one we used before
      return goTo(3);
    }

    if (currentStepIndex === 2) {
      // reset the possibly created WebAuthn credentials to make sure the Biometrics form cannot be submitted
      updateFields({
        credentialId: '',
        credentialPubkey: '',
      });
    }

    next();
  };

  const goBack = () => {
    setDirection('backward');

    if (currentStepIndex === 0) {
      router.push(cancelRedirectUrl);
    }

    if (currentStepIndex === 3 && data.usedAlias === data.alias) {
      // skip the fingerprint step when we already have an account for the same alias
      return goTo(1);
    }

    previous();
  };

  return (
    <Stack flexDirection="column" gap="md">
      <Box width="100%" padding="lg">
        <DeviceCard
          account={{
            alias: data.alias,
            accountName: data.accountName,
            balance: '0.0',
            network: data.networkId,
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
      <Form onSubmit={onSubmit}>
        <Box className={stepStyle}>{step}</Box>
        {!isSubmitting && (
          <Stack
            flexDirection={'row'}
            gap={'xl'}
            marginBlock={'lg'}
            paddingInline={'lg'}
          >
            <Button
              variant="secondary"
              onPress={goBack}
              className={atoms({ flex: 1 })}
            >
              {isFirstStep ? 'Cancel' : 'Previous'}
            </Button>

            <Button
              variant="progress"
              progress={((currentStepIndex + 1) / steps.length) * 100}
              className={atoms({ flex: 1 })}
              type="submit"
            >
              {isLastStep ? 'Complete' : 'Next'}
            </Button>
          </Stack>
        )}
      </Form>
    </Stack>
  );
}
