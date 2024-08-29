import { maskValue, Stack, Text } from '@kadena/kode-ui';
import type { Account } from '@kadena/spirekey-types';

import { atoms } from '@kadena/kode-ui/styles';
import DeviceCircle from '../Device/DeviceCircle';

interface AccountProps {
  account: Account;
  onClick: (account: Account) => void;
}

export function Account({ account, onClick }: AccountProps) {
  return (
    <Stack
      flexDirection="row"
      gap="xl"
      borderColor="base.subtle"
      borderWidth="normal"
      borderStyle="solid"
      borderRadius="sm"
      paddingBlock="md"
      paddingInline="lg"
      alignItems="center"
      onClick={() => onClick(account)}
      cursor="pointer"
    >
      <Stack flexGrow={1} alignItems="center" gap="sm">
        <DeviceCircle device={account.devices[0]} />
        <Text>{account.alias}</Text>
      </Stack>
      <Stack
        flexDirection="column"
        alignItems="flex-end"
        gap="sm"
        className={atoms({ textAlign: 'right' })}
      >
        <Text>{maskValue(account.accountName)}</Text>
        <Text size="smallest">{account.balance} KDA</Text>
      </Stack>
    </Stack>
  );
}
