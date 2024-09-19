import { getDeviceIcon } from '@/utils/getDeviceIcon';
import { Heading, maskValue, Stack, Text, Tile } from '@kadena/kode-ui';
import { atoms } from '@kadena/kode-ui/styles';
import type { Account } from '@kadena/spirekey-types';
import { useMemo } from 'react';
import DeviceCircle from '../Device/DeviceCircle';

interface AccountProps {
  account: Account;
  onClick: (account: Account) => void;
}

export function AccountTile({ account, onClick }: AccountProps) {
  const accountNameArray: string[] = useMemo(() => {
    const arr = account.accountName.split(':');
    arr[0] = `${arr[0]}:`;

    return arr;
  }, [account.accountName]);

  return (
    <Tile as="button" onClick={() => onClick(account)}>
      <Stack flexDirection="column" width="100%">
        <Stack width="100%" gap="md">
          {getDeviceIcon(account.devices[0].deviceType)}

          <Stack
            alignItems="flex-start"
            flexDirection="column"
            width="100%"
            gap="sm"
            marginBlockStart="sm"
          >
            <Heading as="h6">{account.alias.replace(/ \(.*\)/, '')}</Heading>
            {accountNameArray.length === 2 && (
              <Stack as="span">
                <Text variant="code" size="small">
                  {accountNameArray[0]}
                </Text>
                <Text variant="code" size="small" color="emphasize">
                  {maskValue(accountNameArray[1])}
                </Text>
              </Stack>
            )}

            <Stack justifyContent="flex-end" width="100%" gap="xs">
              <Text variant="code" size="small" color="emphasize">
                {account.balance}
              </Text>
              <Text variant="code" size="small" color="default">
                KDA
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Tile>
  );
}
