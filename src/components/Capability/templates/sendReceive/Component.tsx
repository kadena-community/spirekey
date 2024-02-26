import { Surface } from '@/components/Surface/Surface';
import { useAccounts } from '@/context/AccountsContext';
import { Heading, Stack, SystemIcon } from '@kadena/react-ui';
import { ICap, IPactDecimal } from '@kadena/types';
import { FC } from 'react';
import * as styles from './component.css';

interface Props {
  cap: ICap;
}

const ellipseAccount = (input: string) => {
  return `${input.slice(0, 4)}...${input.slice(-4)}`;
};

export const SendReceiveTemplate: FC<Props> = ({ cap }) => {
  const [sender, receiver, amount] = cap.args as [string, string, IPactDecimal];

  return (
    <Stack flexDirection="column" width="100%" gap="md">
      <Heading as="h5">Coin Transfer</Heading>

      <Surface>
        <Stack justifyContent="space-between">
          <Stack
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="sm"
          >
            <div className={styles.avatar}>
              <SystemIcon.Account />
            </div>
            <span>{ellipseAccount(sender as string)}</span>
          </Stack>

          <Stack
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <div>{'>'}</div>
            <div>{parseFloat(amount.decimal)}</div>
          </Stack>

          <Stack
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="sm"
          >
            <div className={styles.avatar}>
              <SystemIcon.Account />
            </div>
            <span>{ellipseAccount(receiver)}</span>
          </Stack>
        </Stack>
      </Surface>
    </Stack>
  );
};
