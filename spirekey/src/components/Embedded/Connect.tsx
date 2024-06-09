'use client';

import logo from '@/assets/images/SpireKey-logo.svg';
import { Account, useAccounts } from '@/context/AccountsContext';
import {
  Notification,
  NotificationHeading,
  Stack,
  SystemIcon,
  Text,
} from '@kadena/react-ui';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MaskedValue } from '../MaskedValue/MaskedValue';
import { SpireKeySpinner } from '../Spinners/SpireKeySpinner';
import { Button } from '../shared/Button/Button';

export default function Connect() {
  const { accounts } = useAccounts();
  const [connectingAccount, setConnectingAccount] = useState<Account | null>(
    null,
  );

  useEffect(() => {
    window.addEventListener('message', (event) => {
      console.log(
        'Message received from the parent: ' +
          JSON.stringify(event.data, null, 2),
      );
    });
  }, []);

  const connect = (account: Account) => {
    setConnectingAccount(account);
    setTimeout(() => {
      window.parent.postMessage(
        {
          source: 'kadena-spirekey',
          name: 'account-connected',
          payload: {
            account,
          },
        },
        '*',
      );
    }, 3000);
  };

  return (
    <Stack flexDirection="column" gap="xxl">
      <Stack flexDirection="column" alignItems="center" gap="sm">
        <Image src={logo} alt="SpireKey logo" style={{ marginTop: '2rem' }} />
      </Stack>
      {accounts.map((account) => (
        <Stack
          key={account.accountName}
          flexDirection="column"
          gap="xl"
          marginBlockEnd="xl"
        >
          <Notification role="none" icon={<SystemIcon.Account />}>
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
                {!!connectingAccount && <SpireKeySpinner size="xs" />}
              </Stack>
            </Button>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}
