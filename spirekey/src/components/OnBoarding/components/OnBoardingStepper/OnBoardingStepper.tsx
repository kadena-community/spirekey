import { Stack, Step, Stepper } from '@kadena/kode-ui';
import React, { FC } from 'react';
import { gridStepperClass } from '../Layout/Layout.css';
import { createStatus } from './utils';

interface IProps {
  step?: number;
  steps?: string[];
}

export const defaultSteps = ['Create / Import', 'Add account'];

export const OnBoardingStepper: FC<IProps> = ({
  step,
  steps = defaultSteps,
}) => {
  return (
    <Stack justifyContent="center" className={gridStepperClass}>
      <Stepper direction="horizontal">
        {steps.map((stepStr, idx) => (
          <Step
            key={stepStr}
            status={createStatus(step, idx)}
            active={step === idx}
          >
            {stepStr}
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
};
