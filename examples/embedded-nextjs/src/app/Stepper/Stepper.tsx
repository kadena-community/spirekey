import { MonoCheck } from '@kadena/kode-icons/system';
import { Stack } from '@kadena/kode-ui';
import * as styles from './Stepper.css';

type StepperProps = {
  children: React.ReactNode;
};
export const Stepper = ({ children }: StepperProps) => {
  return (
    <Stack className={styles.stepper} flexDirection="column">
      {children}
    </Stack>
  );
};
type StepProps = {
  status: 'positive' | 'warning' | 'error' | 'todo';
  title: string;
  active?: boolean;
};
export const Step = ({ title, status, active }: StepProps) => {
  return (
    <Stack
      className={styles.step}
      flexDirection="row"
      alignItems="center"
      gap="md"
      data-active={active}
    >
      <Stack marginInlineStart="lg" gap="sm">
        {title}
        <MonoCheck fontSize="lg" />
      </Stack>
    </Stack>
  );
};
