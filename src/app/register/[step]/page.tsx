'use client';

import { Button } from '@kadena/react-ui';
import { useParams, useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { Color } from './steps/Color';
import { Fingerprint } from './steps/Fingerprint';
import { Icon } from './steps/Icon';

const STEPS = ['fingerprint', 'icon', 'color'];
const FORM_DEFAULT = {
  caccount: null,
  icon: null,
  color: null,
};

export default function Account() {
  const { push } = useRouter();
  const params = useParams();
  const methods = useForm({ defaultValues: FORM_DEFAULT });

  const currentStep = STEPS.indexOf(params.step as string);
  const prevStep = STEPS[currentStep - 1];
  const nextStep = STEPS[currentStep + 1];

  const goToNextStep = () => {
    if (!nextStep) return;
    push(`/register/${nextStep}`);
  };

  const goToPrevStep = () => {
    if (!prevStep) return;
    push(`/register/${prevStep}`);
  };

  return (
    <>
      <FormProvider {...methods}>
        {params.step === 'fingerprint' && <Fingerprint />}
        {params.step === 'icon' && <Icon />}
        {params.step === 'color' && <Color />}
      </FormProvider>
      {prevStep && <Button onClick={goToPrevStep}>Back</Button>}
      {nextStep && <Button onClick={goToNextStep}>Next</Button>}
    </>
  );
}
