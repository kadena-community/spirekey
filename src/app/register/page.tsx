'use client';

import Card from '@/components/Card/Card';
import { ProgressButton } from '@/components/ProgressButton.tsx/ProgressButton';
import { Box, Button, Stack } from '@kadena/react-ui';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { buttons, container, step, stepWrapper, wrapper } from './page.css';
import { Color } from './steps/Color';
import { Icon } from './steps/Icon';
import { Network } from './steps/Network';

const TOTAL_STEPS = 3;
const FORM_DEFAULT = {
  network: null,
  icon: null,
  color: null,
};

export default function Account() {
  const methods = useForm({ defaultValues: FORM_DEFAULT });

  const [currentStep, setCurrentStep] = useState(1);
  const prevStep = currentStep > 1 ? currentStep - 1 : null;
  const nextStep = currentStep < TOTAL_STEPS ? currentStep + 1 : null;

  const goToNextStep = () => {
    if (!nextStep) return;
    setCurrentStep(nextStep);
  };

  const goToPrevStep = () => {
    if (!prevStep) return;
    setCurrentStep(prevStep);
  };

  return (
    <Stack flexDirection="column" gap="md">
      <Box width="100%" paddingInline="md">
        <Card
          account={{
            accountName: '',
            balance: '',
            devices: [],
            network: '',
          }}
          onClick={() => {}}
          isActive={true}
          isCollapsed={false}
        />
      </Box>

      <FormProvider {...methods}>
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
                <Icon isVisible={currentStep === 2} />
              </div>
            </div>
            <div className={stepWrapper}>
              <div className={step}>
                <Color isVisible={currentStep === 3} />
              </div>
            </div>
          </motion.div>
        </div>
      </FormProvider>

      <div className={buttons}>
        {!prevStep && <Button onClick={() => {}}>Cancel</Button>}
        {prevStep && <Button onClick={goToPrevStep}>Previous</Button>}

        <ProgressButton
          onClick={goToNextStep}
          progress={(currentStep / TOTAL_STEPS) * 100}
        >
          {nextStep ? 'Next' : 'Complete'}
        </ProgressButton>
      </div>
    </Stack>
  );
}
