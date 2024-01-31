'use client';

import { Button } from '@/components/Button/Button';
import DeviceCard from '@/components/Card/DeviceCard';
import { useAccounts } from '@/context/AccountsContext';
import { usePubkeys } from '@/hooks/usePubkeys';
import { useReturnUrl } from '@/hooks/useReturnUrl';
import { deviceColors } from '@/styles/tokens.css';
import { fundAccount } from '@/utils/fund';
import {
  getAccountName,
  getWebAuthnPubkeyFormat,
  registerAccount,
} from '@/utils/register';
import { getNewWebauthnKey } from '@/utils/webauthnKey';
import { Box, Stack, Text } from '@kadena/react-ui';
import { atoms } from '@kadena/react-ui/styles';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import { container, step, wrapper } from './page.css';
import { Alias } from './steps/Alias';
import { Color } from './steps/Color';
import { DeviceType } from './steps/DeviceType';
import { Fingerprint } from './steps/Fingerprint';
import { Network } from './steps/Network';

const isInstaFund = process.env.INSTA_FUND === 'true';

const TOTAL_STEPS = isInstaFund ? 1 : 5;

const FORM_DEFAULT = isInstaFund
  ? {
      networkId: 'testnet04',
      alias: '',
      deviceType: 'phone',
      color: deviceColors.yellow,
      credentialPubkey: '',
      credentialId: '',
      accountName: 'c:....................................',
    }
  : {
      networkId: 'fast-development',
      alias: '',
      deviceType: 'security-key',
      color: deviceColors.purple,
      credentialPubkey: '',
      credentialId: '',
      accountName: 'c:....................................',
    };

type FormValues = typeof FORM_DEFAULT;

export default function Account() {
  const { mutate } = useSWRConfig();
  const formMethods = useForm({ defaultValues: FORM_DEFAULT });
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [canSubmit, setCanSubmit] = useState(false);
  const [usedAlias, setUsedAlias] = useState<string>();
  const { storeAccount } = useAccounts();
  const { host } = useReturnUrl();

  const { addPubkey } = usePubkeys();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const prevStep = currentStep > 1 ? currentStep - 1 : null;
  const nextStep = currentStep < TOTAL_STEPS ? currentStep + 1 : null;

  useEffect(() => {
    if (!nextStep) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [nextStep]);

  const goToPrevStep = () => {
    if (!prevStep) return;

    if (currentStep === 4 && usedAlias === formMethods.getValues('alias')) {
      // skip the fingerprint step when we already have an account for the same alias
      return setCurrentStep(prevStep - 1);
    }

    setCurrentStep(prevStep);
  };

  const goToNextStep = () => {
    if (!nextStep) return;
    if (currentStep === 2 && usedAlias === formMethods.getValues('alias')) {
      // skip the fingerprint step if the currently filled in alias is the same as the one we used before
      return setCurrentStep(nextStep + 1);
    }

    if (currentStep === 3) {
      // get a new account
      setUsedAlias(formMethods.getValues('alias'));
      return onChangeAlias().then(() => setCurrentStep(nextStep));
    }

    setCurrentStep(nextStep);
  };

  const onChangeAlias = async () => {
    const { credentialId, publicKey } = await getNewWebauthnKey(
      formMethods.getValues('alias'),
    );
    formMethods.setValue('credentialId', credentialId);
    formMethods.setValue('credentialPubkey', publicKey);
    const accountName = await getAccountName(publicKey);
    formMethods.setValue('accountName', accountName);
    return { credentialId, publicKey, accountName };
  };

  const onSubmit = async (data: FormValues) => {
    if (isSubmitting) return;

    if (isInstaFund) {
      const { credentialId, publicKey, accountName } = await onChangeAlias();
      setIsSubmitting(true);
      const caccount = await registerAccount({
        credentialPubkey: publicKey,
        credentialId,
        displayName: `${data.deviceType}_${data.color}`,
        domain: host,
        network: data.networkId,
      });
      addPubkey({
        cid: credentialId,
        pubkey: getWebAuthnPubkeyFormat(publicKey),
      });
      storeAccount({
        accountName: caccount,
        alias: data.alias,
        network: data.networkId,
      });
      fundAccount({ account: caccount, network: data.networkId });

      mutate('accounts');

      router.push('/');
      return;
    }

    setIsSubmitting(true);
    const caccount = await registerAccount({
      credentialPubkey: formMethods.getValues('credentialPubkey'),
      credentialId: formMethods.getValues('credentialId'),
      displayName: `${data.deviceType}_${data.color}`,
      domain: host,
      network: data.networkId,
    });
    addPubkey({
      cid: formMethods.getValues('credentialId'),
      pubkey: getWebAuthnPubkeyFormat(
        formMethods.getValues('credentialPubkey'),
      ),
    });
    storeAccount({
      accountName: caccount,
      alias: data.alias,
      network: data.networkId,
    });

    mutate('accounts');

    router.push('/');
  };

  return (
    <Stack flexDirection="column" gap="md">
      <Box width="100%" padding="lg">
        <DeviceCard
          account={{
            alias: formMethods.watch('alias'),
            accountName: formMethods.watch('accountName'),
            balance: '0.0',
            network: formMethods.watch('networkId'),
            devices: [
              {
                'credential-id': formMethods.watch('credentialId'),
                domain: host,
                color: formMethods.watch('color'),
                deviceType: formMethods.watch('deviceType'),
                guard: {
                  keys: [formMethods.watch('credentialPubkey')],
                  pred: 'keys-any',
                },
              },
            ],
          }}
          isLoading={isSubmitting}
        />
      </Box>

      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <div className={wrapper}>
            <motion.div
              animate={{ x: `-${(currentStep - 1) * 100}%` }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              className={container}
            >
              {isInstaFund && (
                <Box className={step}>
                  <Alias isVisible />
                </Box>
              )}

              {!isInstaFund && (
                <>
                  <Box className={step}>
                    <Network isVisible={currentStep === 1} />
                  </Box>

                  <Box className={step}>
                    <Alias isVisible={currentStep === 2} />
                  </Box>

                  <Box className={step}>
                    <Fingerprint
                      isVisible={currentStep === 3}
                      onClick={goToNextStep}
                    />
                  </Box>

                  <Box className={step}>
                    <DeviceType isVisible={currentStep === 4} />
                  </Box>

                  <Box className={step}>
                    <Color isVisible={currentStep === 5} />
                  </Box>
                </>
              )}
            </motion.div>
          </div>

          {!isSubmitting && (
            <div
              className={atoms({
                display: 'flex',
                marginBlock: 'lg',
                gap: 'xl',
                paddingInline: 'lg',
              })}
            >
              {isInstaFund && (
                <>
                  <Button
                    variant="secondary"
                    onPress={goToPrevStep}
                    className={atoms({ flex: 1 })}
                  >
                    Cancel
                  </Button>

                  <Button
                    onPress={goToNextStep}
                    variant="progress"
                    progress={100}
                    className={atoms({ flex: 1 })}
                    type="submit"
                  >
                    Complete
                  </Button>
                </>
              )}
              {!isInstaFund && (
                <>
                  <Button
                    variant="secondary"
                    onPress={goToPrevStep}
                    className={atoms({ flex: 1 })}
                  >
                    {!prevStep ? 'Cancel' : 'Previous'}
                  </Button>

                  <Button
                    onPress={goToNextStep}
                    variant="progress"
                    progress={(currentStep / TOTAL_STEPS) * 100}
                    className={atoms({ flex: 1 })}
                    type={canSubmit ? 'submit' : 'button'}
                  >
                    {canSubmit ? 'Complete' : 'Next'}
                  </Button>
                </>
              )}
            </div>
          )}
        </form>
      </FormProvider>
    </Stack>
  );
}
