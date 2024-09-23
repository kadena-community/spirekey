'use client';

import { useNotifications } from '@/context/shared/NotificationsContext';
import { useFlag } from '@/hooks/useFlag';
import { useAccounts } from '@/resolvers/accounts';
import { useCredentials } from '@/resolvers/connect-wallet';
import { Button, Heading, maskValue, Stack, Text } from '@kadena/kode-ui';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { AliasEditor } from './components/AliasEditor';
import { MnemonicRevealer } from './components/MnemonicRevealer';

export default function WalletBackup() {
  const params = useParams();
  const { accounts } = useAccounts();
  const raccount = decodeURIComponent(params.raccount.toString());
  const account = accounts?.find((a) => a.accountName === raccount);
  const { getCredentials } = useCredentials();
  const [mnemonic, setMnemonic] = useState('');
  const isAccountManagementEnabled = useFlag('account_management');

  const { addNotification } = useNotifications();

  return (
    <>
      <Stack flexDirection="column">
        <Heading>Wallet</Heading>
        <Text>
          Reveal the mnemonic phrase of your account {maskValue(raccount)}
        </Text>
        <Button
          variant="primary"
          isDisabled={!!mnemonic}
          onPress={async () => {
            if (!account) return;
            const { mnemonic } = await getCredentials(account.networkId);
            if (!mnemonic)
              addNotification({
                variant: 'warning',
                title: 'Please migrate your account',
                message:
                  'Your account was created before the support of mnemonic phrases. Please create a new account and transfer your funds.',
                timeout: 30_000,
              });
            setMnemonic(mnemonic);
          }}
        >
          Reveal
        </Button>
      </Stack>
      <Stack flexDirection="column">
        <Heading>Mnemonic</Heading>
        <Text>
          Make sure to keep your mnemonic phrase safe! If a bad actor get's hold
          of your mnemonic phrase, they will have full access to your account.
        </Text>
        <MnemonicRevealer mnemonic={mnemonic} />

        {isAccountManagementEnabled && (
          <AliasEditor accountName={account?.accountName} />
        )}
      </Stack>
    </>
  );
}
