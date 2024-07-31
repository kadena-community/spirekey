import { Step, Stepper } from "./Stepper/Stepper";

export const ExampleStepper = ({ step }: { step: number }) => {
  const steps = [
    'Step 1: Connect',
    'Step 2: Fund',
    'Step 3: Transfer',
    'Step 4: Sign',
  ]
    .map((label, i) => ({ label, active: i === step }))
    .map(({ label, active }) => (
      <Step key={label} active={active}>
        {label}
      </Step>
    ));
  return <Stepper>{steps}</Stepper>;
};
