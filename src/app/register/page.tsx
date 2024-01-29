'use client';

import { Button } from '@/components/Button/Button';
import Card from '@/components/Card/Card';
import { ProgressBox } from '@/components/ProgressBox/ProgressBox';
import { useAccounts } from '@/hooks/useAccounts';
import { useReturnUrl } from '@/hooks/useReturnUrl';
import { getAccountName, registerAccount } from '@/utils/register';
import { getNewWebauthnKey } from '@/utils/webauthnKey';
import { Box, Stack } from '@kadena/react-ui';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  buttonsContainer,
  container,
  progressButton,
  step,
  stepWrapper,
  wrapper,
} from './page.css';
import { Alias } from './steps/Alias';
import { Color } from './steps/Color';
import { DeviceType } from './steps/DeviceType';
import { Network } from './steps/Network';

const TOTAL_STEPS = 4;
const FORM_DEFAULT = {
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
  const formMethods = useForm({ defaultValues: FORM_DEFAULT });

  const [currentStep, setCurrentStep] = useState(1);
  const prevStep = currentStep > 1 ? currentStep - 1 : null;
  const nextStep = currentStep < TOTAL_STEPS ? currentStep + 1 : null;

  const { storeAccount } = useAccounts();

  const { host } = useReturnUrl();

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
  };

  const goToPrevStep = () => {
    if (!prevStep) return;
    setCurrentStep(prevStep);
  };

  const onSubmit = async (data: FormValues) => {
    const caccount = await registerAccount({
      credentialPubkey: formMethods.getValues('credentialPubkey'),
      credentialId: formMethods.getValues('credentialId'),
      displayName: `${data.deviceType}_${data.color}`,
      domain: window.location.hostname,
    });

    storeAccount(caccount);
  };

  return (
    <Stack flexDirection="column" gap="md">
      <Box width="100%" paddingInline="md">
        <Card
          account={{
            alias: formMethods.watch('alias'),
            accountName: formMethods.watch('accountName'),
            balance: '0.0',
            network: formMethods.watch('networkId'),
            devices: [
              {
                'credential-id': formMethods.watch('credentialId'),
                domain: host,
                identifier: `${formMethods.watch(
                  'deviceType',
                )}_${formMethods.watch('color')}`,
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
              <div className={stepWrapper}>
                <div className={step}>
                  <Network isVisible={currentStep === 1} />
                </div>
              </div>

              <div className={stepWrapper}>
                <div className={step}>
                  <Alias isVisible={currentStep === 2} />
                </div>
              </div>

              <div className={stepWrapper}>
                <div className={step}>
                  <DeviceType isVisible={currentStep === 3} />
                </div>
              </div>

              <div className={stepWrapper}>
                <div className={step}>
                  <Color isVisible={currentStep === 4} />
                </div>
              </div>
            </motion.div>
          </div>

          <div className={buttonsContainer}>
            {!prevStep && <Button onClick={() => {}}>Cancel</Button>}
            {prevStep && <Button onClick={goToPrevStep}>Previous</Button>}

            <ProgressBox progress={(currentStep / TOTAL_STEPS) * 100}>
              {nextStep && (
                <button
                  onClick={goToNextStep}
                  type="button"
                  className={progressButton}
                >
                  Next
                </button>
              )}
              {!nextStep && (
                <button type="submit" className={progressButton}>
                  Complete
                </button>
              )}
            </ProgressBox>
          </div>
        </form>
      </FormProvider>
    </Stack>
  );
}
