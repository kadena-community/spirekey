import { MonoCheck } from '@kadena/kode-icons/system';
import { Stack } from '@kadena/kode-ui';
import { ReactNode } from 'react';
import * as styles from './Stepper.css';

type StepperProps = {
  children: React.ReactNode;
};
export const Stepper = ({ children }: StepperProps) => {
  return (
    <Stack
      className={styles.stepper}
      marginInlineStart="sm"
      flexDirection="column"
    >
      {children}
    </Stack>
  );
};
type StepProps = {
  status?: 'positive' | 'warning' | 'error' | 'todo';
  children: ReactNode;
  active?: boolean;
};
export const Step = ({ children, status, active }: StepProps) => {
  return (
    <Stack
      className={styles.step}
      flexDirection="row"
      alignItems="center"
      gap="md"
      data-active={active}
    >
      <Stack marginInlineStart="lg" gap="sm">
        {children}
        <MonoCheck fontSize="lg" />
      </Stack>
    </Stack>
  );
};
