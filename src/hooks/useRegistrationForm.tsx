import { FormData, StepProps } from '@/components/Registration/Registration';
import { FC, useState } from 'react';

export function useRegistrationForm(
  steps: FC<StepProps>[],
  formValues: FormData,
  onSubmit: (formValues: FormData) => void,
) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    const nextStepIndex =
      currentStepIndex + Number(currentStepIndex < steps.length - 1);

    if (
      steps[nextStepIndex].name === 'BiometricsForm' &&
      formValues.usedAlias === formValues.alias
    ) {
      // skip the fingerprint step if the currently filled in alias is the same as the one we used before
      return goTo(nextStepIndex + 1);
    }

    if (currentStepIndex === steps.length - 1) {
      onSubmit(formValues);
    }

    goTo(nextStepIndex);
  }

  function previous() {
    const previousStepIndex = currentStepIndex - Number(currentStepIndex > 0);

    if (
      steps[previousStepIndex].name === 'BiometricsForm' &&
      formValues.usedAlias === formValues.alias
    ) {
      // skip the fingerprint step when we already have an account for the same alias
      return goTo(previousStepIndex - 1);
    }

    goTo(previousStepIndex);
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
