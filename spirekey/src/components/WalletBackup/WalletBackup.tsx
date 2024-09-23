'use client';

import { useNotifications } from '@/context/shared/NotificationsContext';
import { useFlag } from '@/hooks/useFlag';
import { useAccounts } from '@/resolvers/accounts';
import { useCredentials } from '@/resolvers/connect-wallet';
import { Button, Stack } from '@kadena/kode-ui';
import { CardContentBlock } from '@kadena/kode-ui/patterns';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { AddDevice } from '../AddDevice/AddDevice';
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

  const handleReveal = async () => {
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
  };

  return (
    <>
      {isAccountManagementEnabled && (
        <Stack marginBlockEnd="xl">
          <AliasEditor accountName={account?.accountName} />
        </Stack>
      )}

      <CardContentBlock
        title="Mnemonic"
        description="Make sure to keep your mnemonic phrase safe! If a bad actor get's hold
          of your mnemonic phrase, they will have full access to your account."
      >
        <Stack justifyContent="flex-end">
          <Button
            variant="primary"
            isDisabled={!!mnemonic}
            onPress={handleReveal}
          >
            Reveal Mnemonic
          </Button>
        </Stack>
      </CardContentBlock>

      <Stack flexDirection="column" marginBlockStart="xxl">
        <MnemonicRevealer mnemonic={mnemonic} />

        {isAccountManagementEnabled && (
          <>
            <AliasEditor accountName={account?.accountName} />
            <AddDevice accountName={account?.accountName} />
          </>
        )}
      </Stack>
    </>
  );
}
