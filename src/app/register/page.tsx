'use client';

import { Button } from '@/components/Button/Button';
import Card2 from '@/components/Card2/Card2';
import { ProgressButton } from '@/components/ProgressButton/ProgressButton';
import { useAccounts } from '@/hooks/useAccounts';
import { registerAccount } from '@/utils/register';
import { getNewWebauthnKey } from '@/utils/webauthnKey';
import { Box, Stack } from '@kadena/react-ui';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  buttonsContainer,
  container,
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
};

type FormValues = typeof FORM_DEFAULT;

export default function Account() {
  const methods = useForm({ defaultValues: FORM_DEFAULT });

  const [currentStep, setCurrentStep] = useState(1);
  const prevStep = currentStep > 1 ? currentStep - 1 : null;
  const nextStep = currentStep < TOTAL_STEPS ? currentStep + 1 : null;

  const { storeAccount } = useAccounts();

  const goToNextStep = () => {
    if (!nextStep) return;
    setCurrentStep(nextStep);
  };

  const goToPrevStep = () => {
    if (!prevStep) return;
    setCurrentStep(prevStep);
  };

  const onSubmit = async (data: FormValues) => {
    const { credentialId, publicKey } = await getNewWebauthnKey(data.alias);

    const caccount = await registerAccount({
      credentialPubkey: publicKey,
      credentialId: credentialId,
      displayName: `${data.deviceType}_${data.color}`,
      domain: window.location.hostname,
    });

    storeAccount(caccount);
  };

  return (
    <Stack flexDirection="column" gap="md">
      <Box width="100%" paddingInline="md">
        <Card2
          account={{
            accountName: '***',
            balance: '0.0',
            network: 'testnet',
            devices: [],
          }}
        />
      </Box>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
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

            {/* Switching the type to 'submit' doesn't work properly, the form than already
            submits in the second step. Switching the complete button out for now. */}
            {!nextStep && <Button type="submit">Complete</Button>}
            {nextStep && (
              <ProgressButton
                onClick={() => goToNextStep()}
                progress={(currentStep / TOTAL_STEPS) * 100}
                type={nextStep ? 'button' : 'submit'}
              >
                {nextStep ? 'Next' : 'Complete'}
              </ProgressButton>
            )}
          </div>
        </form>
      </FormProvider>
    </Stack>
  );
}
