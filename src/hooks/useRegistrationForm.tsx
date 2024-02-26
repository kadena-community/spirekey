import { FormData, StepProps } from '@/components/Registration/Registration';
import { FC, useState } from 'react';

export function useRegistrationForm(
  steps: FC<StepProps>[],
  formValues: FormData,
  onSubmit: (formValues: FormData) => void,
) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    if (currentStepIndex === 1 && formValues.usedAlias === formValues.alias) {
      // skip the fingerprint step if the currently filled in alias is the same as the one we used before
      return goTo(3);
    }

    if (currentStepIndex === steps.length - 1) {
      onSubmit(formValues);
    }

    setCurrentStepIndex((i) => i + Number(i < steps.length - 1));
  }

  function previous() {
    if (currentStepIndex === 3 && formValues.usedAlias === formValues.alias) {
      // skip the fingerprint step when we already have an account for the same alias
      return goTo(1);
    }

    setCurrentStepIndex((i) => i - Number(i > 0));
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  return {
    steps,
    currentStepIndex,
    step: steps[currentStepIndex],
    isLastStep: currentStepIndex === steps.length - 1,
    isFirstStep: currentStepIndex === 0,
    next,
    previous,
    goTo,
  };
}
