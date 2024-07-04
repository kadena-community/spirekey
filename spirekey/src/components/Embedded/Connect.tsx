'use client';

import { MonoManageAccounts } from '@kadena/kode-icons';
import {
  Avatar,
  Box,
  Notification,
  NotificationHeading,
  Stack,
  Text,
} from '@kadena/kode-ui';
import type { Account } from '@kadena/spirekey-types';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import SpireKeyLogoAnimated from '@/assets/images/spireKey-logo-animated.svg';
import { MaskedValue } from '@/components/MaskedValue/MaskedValue';
import { Button } from '@/components/shared/Button/Button';
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
      </Stack>
    </LayoutSurface>
  );
}
