import { Step, Stepper } from '../components/Stepper/Stepper';

export const ExampleStepper = ({ step }: { step: number }) => {
  const steps = ['Connect', 'Fund', 'Transfer', 'Sign']
    .map((label, i) => ({ label, active: i === step }))
    .map(({ label, active }) => (
      <Step key={label} active={active}>
        {label}
      </Step>
    ));
  return <Stepper>{steps}</Stepper>;
};
