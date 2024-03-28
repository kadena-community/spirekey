import { FormData, StepProps } from '@/components/AddDevice/AddDevice';
import { FC, useState } from 'react';

export function useAddDeviceForm(
  steps: FC<StepProps>[],
  formValues: FormData,
  onSubmit: (formValues: FormData) => void,
) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    const nextStepIndex =
      currentStepIndex + Number(currentStepIndex < steps.length - 1);

    if (currentStepIndex === steps.length - 1) {
      onSubmit(formValues);
    }

    goTo(nextStepIndex);
  }

  function previous() {
    const previousStepIndex = currentStepIndex - Number(currentStepIndex > 0);
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
