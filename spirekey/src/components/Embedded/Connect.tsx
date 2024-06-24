'use client';

import type { Account } from '@kadena-spirekey/types';
import { MonoManageAccounts } from '@kadena/react-icons';
import {
  Notification,
  NotificationHeading,
  Stack,
  Text,
} from '@kadena/react-ui';
import Image from 'next/image';
import { useState } from 'react';

import SpireKeyLogo from '@/assets/images/SpireKey-logo.svg';
import SpireKeyLogoAnimated from '@/assets/images/spireKey-logo-animated.svg';
import { MaskedValue } from '@/components/MaskedValue/MaskedValue';
import { Button } from '@/components/shared/Button/Button';
import { useAccounts } from '@/context/AccountsContext';
import { publishEvent } from '@/utils/publishEvent';

export default function Connect() {
  const { accounts } = useAccounts();
  const [connectingAccount, setConnectingAccount] = useState<
    Account | undefined
  >(undefined);

  const connect = (account: Account) => {
    setConnectingAccount(account);
    publishEvent('connected', account);
  };

  return (
    <Stack flexDirection="column" gap="xxl">
      <Stack flexDirection="column" alignItems="center" gap="sm">
        <Image
          src={SpireKeyLogo}
          alt="SpireKey logo"
          style={{ marginTop: '2rem' }}
        />
      </Stack>
      {accounts.map((account) => (
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
                {!!connectingAccount && <SpireKeyLogoAnimated />}
              </Stack>
            </Button>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}
