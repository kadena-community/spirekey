'use client';

import { AccountTabs } from '@/components/AccountTabs/AccountTabs';
import WalletBackup from '@/components/WalletBackup/WalletBackup';
import { Stack } from '@kadena/kode-ui';
import { overviewWrapperClass } from '../style.css';

export default function WalletPage() {
  return (
    <AccountTabs selectedTabKey="settings">
      <Stack
        gap="xl"
        width="100%"
        padding="lg"
        className={overviewWrapperClass}
      >
        <WalletBackup />
      </Stack>
    </AccountTabs>
  );
}
