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
        title="Seed Phrase"
        description="Make sure to keep your seed phrase safe! Anyone with access to your seed phrase can access your account. Store it securely offline, and never share it with anyone."
      >
        <Stack justifyContent="flex-end">
          <Button
            variant="primary"
            isDisabled={!!mnemonic}
            onPress={handleReveal}
          >
            Reveal Seed Phrase
          </Button>
        </Stack>
      </CardContentBlock>

      <Stack flexDirection="column" marginBlockStart="xxl">
        <MnemonicRevealer mnemonic={mnemonic} />
      </Stack>

      {isAccountManagementEnabled && (
        <>
          <AddDevice accountName={account?.accountName} />
        </>
      )}
    </>
  );
}
