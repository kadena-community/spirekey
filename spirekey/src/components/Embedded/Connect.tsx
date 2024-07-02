'use client';

import { MonoManageAccounts } from '@kadena/react-icons';
import {
  Notification,
  NotificationHeading,
  Stack,
  Text,
} from '@kadena/react-ui';
import type { Account } from '@kadena/spirekey-types';
import Image from 'next/image';
import { useState } from 'react';

import SpireKeyLogo from '@/assets/images/SpireKey-logo.svg';
import SpireKeyLogoAnimated from '@/assets/images/spireKey-logo-animated.svg';
import { MaskedValue } from '@/components/MaskedValue/MaskedValue';
import { Button } from '@/components/shared/Button/Button';
import { useAccounts } from '@/context/AccountsContext';
import { publishEvent } from '@/utils/publishEvent';
import { ChainId } from '@kadena/client';

type ConnectProps = {
  chainId: ChainId;
  networkId: string;
};
export default function Connect({ chainId, networkId }: ConnectProps) {
  const { accounts } = useAccounts();
  const [connectingAccount, setConnectingAccount] = useState<
    Account | undefined
  >(undefined);

  const connect = (account: Account) => {
    setConnectingAccount(account);
    publishEvent('connected', account);
  };

  const candidateAccounts = accounts.filter(
    (account) =>
      account.networkId === networkId && account.chainIds.includes(chainId),
  );
  return (
    <Stack flexDirection="column" gap="xxl">
      <Stack flexDirection="column" alignItems="center" gap="sm">
        <Image
          src={SpireKeyLogo}
          alt="SpireKey logo"
          style={{ marginTop: '2rem' }}
        />
      </Stack>
      {candidateAccounts.map((account) => (
        <Stack
          key={account.accountName}
          flexDirection="column"
          gap="xl"
          marginBlockEnd="xl"
        >
          <Notification role="none" icon={<MonoManageAccounts />}>
            <NotificationHeading>{account.alias}</NotificationHeading>
            <Stack flexDirection="column" gap="sm">
              <Text>
                {connectingAccount ? 'Signing' : 'Sign'} in with your existing
                account.
              </Text>
              <MaskedValue value={account.accountName} />
            </Stack>
          </Notification>
          <Stack
            flexDirection="row"
            justifyContent="center"
            marginBlockEnd="xl"
          >
            <Button
              variant="primary"
              onPress={() => connect(account)}
              isDisabled={!!connectingAccount}
            >
              <Stack flexDirection="row" alignItems="center" gap="sm">
                <Text>{connectingAccount ? 'Connecting' : 'Connect'}</Text>
                {!!connectingAccount && (
                  <Image
                    src={SpireKeyLogoAnimated}
                    alt="Connecting account.."
                    style={{ marginTop: '2rem' }}
                  />
                )}
              </Stack>
            </Button>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}
