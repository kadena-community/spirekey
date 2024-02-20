import { ReactElement, useState } from 'react';

export function useRegistrationForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex((i) => i + Number(i < steps.length - 1));
    // @todo: navigate to accounts page when navigating beyond the last step.
  }

  function previous() {
    setCurrentStepIndex((i) => i - Number(i > 0));
    // @todo: navigate to welcome page when navigating back from step 0.
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
