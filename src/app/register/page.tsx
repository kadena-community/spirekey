'use client';

import { Button } from '@/components/Button/Button';
import DeviceCard from '@/components/Card/DeviceCard';
import { Surface } from '@/components/Surface/Surface';
import { useAccounts } from '@/context/AccountsContext';
import { useReturnUrl } from '@/hooks/useReturnUrl';
import { fundAccount } from '@/utils/fund';
import { getAccountName, registerAccount } from '@/utils/register';
import { getNewWebauthnKey } from '@/utils/webauthnKey';
import { Box, Stack } from '@kadena/react-ui';
import { atoms } from '@kadena/react-ui/styles';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import { container, wrapper } from './page.css';
import { Alias } from './steps/Alias';
import { Color } from './steps/Color';
import { DeviceType } from './steps/DeviceType';
import { Network } from './steps/Network';

const isInstaFund = process.env.INSTA_FUND === 'true';

const TOTAL_STEPS = isInstaFund ? 1 : 4;

const FORM_DEFAULT = isInstaFund
  ? {
      networkId: 'testnet04',
      alias: '',
      deviceType: 'phone',
      color: 'yellow',
      credentialPubkey: '',
      credentialId: '',
      accountName: '',
    }
  : {
      networkId: '',
      alias: '',
      deviceType: '',
      color: '',
      credentialPubkey: '',
      credentialId: '',
      accountName: '',
    };

type FormValues = typeof FORM_DEFAULT;

export default function Account() {
  const { mutate } = useSWRConfig();
  const formMethods = useForm({ defaultValues: FORM_DEFAULT });
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [canSubmit, setCanSubmit] = useState(false);
  const { storeAccount } = useAccounts();
  const { host } = useReturnUrl();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const prevStep = currentStep > 1 ? currentStep - 1 : null;
  const nextStep = currentStep < TOTAL_STEPS ? currentStep + 1 : null;

  useEffect(() => {
    if (!nextStep) {
      setCanSubmit(true);
    }
  }, [nextStep]);

  const goToPrevStep = () => {
    if (!prevStep) return;
    setCurrentStep(prevStep);
  };

  const goToNextStep = () => {
    if (!nextStep) return;
    if (nextStep === 3) {
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
    setIsSubmitting(true);
    if (isInstaFund) {
      const { credentialId, publicKey, accountName } = await onChangeAlias();
      const caccount = await registerAccount({
        credentialPubkey: publicKey,
        credentialId,
        displayName: `${data.deviceType}_${data.color}`,
        domain: host,
        network: data.networkId,
      });
      fundAccount({ account: caccount, network: data.networkId });
      storeAccount({
        accountName: caccount,
        alias: data.alias,
        network: data.networkId,
      });
      mutate('accounts');

      router.push('/');
      return;
    }

    const caccount = await registerAccount({
      credentialPubkey: formMethods.getValues('credentialPubkey'),
      credentialId: formMethods.getValues('credentialId'),
      displayName: `${data.deviceType}_${data.color}`,
      domain: host,
      network: data.networkId,
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
    <Stack flexDirection="column" gap="md" padding="lg">
      <Box width="100%">
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
                <Surface>
                  <Alias isVisible={true} />
                </Surface>
              )}
              {!isInstaFund && (
                <>
                  <Surface>
                    <Network isVisible={currentStep === 1} />
                  </Surface>

                  <Surface>
                    <Alias isVisible={currentStep === 2} />
                  </Surface>
                  <Surface>
                    <DeviceType isVisible={currentStep === 3} />
                  </Surface>
                  <Surface>
                    <Color isVisible={currentStep === 4} />
                  </Surface>
                </>
              )}
            </motion.div>
          </div>

          {isSubmitting && <div>Loading...</div>}
          {!isSubmitting && (
            <div
              className={atoms({
                display: 'flex',
                marginBlock: 'lg',
                gap: 'xl',
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
