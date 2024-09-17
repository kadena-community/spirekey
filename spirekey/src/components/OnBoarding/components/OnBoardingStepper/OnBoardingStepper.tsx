import { Stack, Step, Stepper } from '@kadena/kode-ui';
import React, { FC } from 'react';

export const OnBoardingStepper: FC = () => {
  return (
    <Stack>
      <Stepper direction="horizontal">
        <Step>Create Wallet</Step>
        <Step>Register Account</Step>
      </Stepper>
    </Stack>
  );
};
