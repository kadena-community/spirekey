'use client';

import { AccountTabs } from '@/components/AccountTabs/AccountTabs';
import WalletBackup from '@/components/WalletBackup/WalletBackup';

export default function WalletPage() {
  return (
    <AccountTabs selectedTabKey="settings">
      <WalletBackup />
    </AccountTabs>
  );
}
