import { Step, Stepper } from '@kadena/kode-ui';
import React, { FC } from 'react';

export const OnBoardingStepper: FC = () => {
  return (
    <Stepper direction="horizontal">
      <Step>Create Wallet</Step>
      <Step>Register Account</Step>
    </Stepper>
  );
};
