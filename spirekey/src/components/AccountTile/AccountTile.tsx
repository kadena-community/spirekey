import { maskValue, Stack, Text, Tile } from '@kadena/kode-ui';
import type { Account } from '@kadena/spirekey-types';

import { atoms } from '@kadena/kode-ui/styles';
import DeviceCircle from '../Device/DeviceCircle';

interface AccountProps {
  account: Account;
  onClick: (account: Account) => void;
}

export function AccountTile({ account, onClick }: AccountProps) {
  return (
    <Tile as="button" onClick={() => onClick(account)}>
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
        cursor="pointer"
      >
        <Stack flexGrow={1} alignItems="center" gap="sm">
          <DeviceCircle device={account.devices[0]} />
          <Text>{account.alias.replace(/ \(.*\)/, '')}</Text>
        </Stack>
        <Stack
          flexDirection="column"
          alignItems="flex-end"
          gap="sm"
          className={atoms({ textAlign: 'right' })}
        >
          <Text>{maskValue(account.accountName)}</Text>
          <Text bold size="smallest">
            {account.balance} KDA
          </Text>
        </Stack>
      </Stack>
    </Tile>
  );
}
