'use client';

import { Button, Stack, Text } from '@kadena/kode-ui';
import type { Account } from '@kadena/spirekey-types';
import { useEffect, useState } from 'react';

import { MaskedValue } from '@/components/MaskedValue/MaskedValue';
import { useAccounts } from '@/context/AccountsContext';
import { publishEvent } from '@/utils/publishEvent';
import { ChainId } from '@kadena/client';
import DeviceCircle from '../Device/DeviceCircle';
import { LayoutSurface } from '../LayoutSurface/LayoutSurface';
import Registration from '../Registration/Registration';

type ConnectProps = {
  chainId: ChainId;
  networkId: string;
};
export default function Connect({ chainId, networkId }: ConnectProps) {
  const { accounts } = useAccounts();
  const [connectingAccount, setConnectingAccount] = useState<
    Account | undefined
  >(undefined);
  const [isRegister, setIsRegister] = useState(false);

  const connect = (account: Account) => {
    setConnectingAccount(account);
    publishEvent('connected', account);
  };
  const cancel = () => {
    publishEvent('canceled:connect');
  };

  const candidateAccounts = accounts.filter(
    (account) =>
      account.networkId === networkId && account.chainIds.includes(chainId),
  );

  useEffect(() => {
    setIsRegister(!candidateAccounts.length);
  }, []);

  if (isRegister)
    return (
      <Registration
        networkId={networkId}
        chainId={chainId}
        onComplete={connect}
        onCancel={cancel}
      />
    );

  return (
    <LayoutSurface title="Accounts" subtitle="available for use">
      <Stack flexDirection="column" gap="sm">
        {candidateAccounts.map((account) => (
          <Stack
            key={account.accountName}
            flexDirection="row"
            gap="xl"
            marginBlockEnd="xl"
            borderColor="base.subtle"
            borderWidth="normal"
            borderStyle="solid"
            borderRadius="sm"
            paddingBlock="md"
            paddingInline="lg"
            alignItems="center"
            onClick={() => connect(account)}
            cursor="pointer"
          >
            <Stack flexGrow={1} alignItems="center" gap="sm">
              <DeviceCircle device={account.devices[0]} />
              <Text>{account.alias}</Text>
            </Stack>
            <MaskedValue value={account.accountName} />
          </Stack>
        ))}
        <Button onPress={cancel} variant="outlined">
          Cancel
        </Button>
      </Stack>
    </LayoutSurface>
  );
}
