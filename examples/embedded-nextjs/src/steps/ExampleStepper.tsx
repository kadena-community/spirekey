import { Step, Stepper } from '@kadena/kode-ui';
import { FC } from 'react';

interface IProps {
  step: number;
  error?: boolean;
}

export const ExampleStepper: FC<IProps> = ({ step, error }) => {
  const steps = ['Connect', 'Fund', 'Transfer', 'Sign']
    .map((label, i) => ({
      label,
      active: i === step,
      error: i === step && error,
    }))
    .map(({ label, active, error }) => (
      <Step key={label} active={active} status={error ? 'error' : undefined}>
        {label}
      </Step>
    ));
  return <Stepper>{steps}</Stepper>;
};
