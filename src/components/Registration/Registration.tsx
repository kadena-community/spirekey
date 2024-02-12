import { FormEvent, useState } from "react";
import { useRegistrationForm } from "@/hooks/useRegistrationForm";
import { Button } from '@/components/Button/Button';
import { AliasForm } from "./AliasForm";
import { Box, Form, Stack } from "@kadena/react-ui";
import { step as stepStyle } from '../../app/register/page.css';
import { atoms } from "@kadena/react-ui/styles";
import { deviceColors } from '@/styles/tokens.css';
import DeviceCard from "../Card/DeviceCard";
import { useReturnUrl } from "@/hooks/useReturnUrl";
import { NetworkIdForm } from "./NetworkIdForm";
import { BiometricsForm } from "./BiometricsForm";
import { useRouter } from "next/navigation";
import { useAccounts } from "@/context/AccountsContext";

const defaultFormData = {
  alias: '',
  usedAlias: '',
  networkId: 'fast-development',
  accountName: 'c:...',
  credentialPubkey: '',
  credentialId: '',
  deviceType: 'security-key',
  color: deviceColors.darkGreen,
};

export type FormData = typeof defaultFormData;

export interface FormMethods {
  updateFields: (fields: Partial<FormData>) => void;
  onCredentialCreated?: () => void;
};

export default function Registration() {
  const router = useRouter();
  const { registerAccount } = useAccounts();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [data, setData] = useState<FormData>(defaultFormData);
  const updateFields = (fields: Partial<FormData>) => setData(current => ({ ...current, ...fields}));
  const onCredentialCreated = () => next();
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
    <AliasForm {...data} updateFields={updateFields} />,
    <NetworkIdForm {...data} updateFields={updateFields} />,
    <BiometricsForm {...data} updateFields={updateFields} onCredentialCreated={onCredentialCreated} />,
    <div>last</div>,
  ]);
  const { host } = useReturnUrl();
  const onSubmit = async (event: FormEvent) => {
    console.log(event);
    event.preventDefault();
    console.log(currentStepIndex, data);
    if (currentStepIndex === 2 && (data.accountName === '' || data.credentialId === '' || data.credentialPubkey === '')) {
      alert('Please confirm your biometric data.');
      return;
    }

    if (isLastStep) {
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
        router.push('/');
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
  }

  const goBack = () => {
    if (currentStepIndex === 0) {
      router.push('/welcome');
    }

    if (currentStepIndex === 3 && data.usedAlias === data.alias) {
      // skip the fingerprint step when we already have an account for the same alias
      return goTo(1)
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
        />
      </Box>
      <Form onSubmit={onSubmit}>
        <Box className={stepStyle}>
          {step}
        </Box>
        {!isSubmitting && <Stack
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
        </Stack>}
      </Form>
    </Stack>
  );
}
