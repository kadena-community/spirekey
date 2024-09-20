'use client';

import WalletBackup from '@/components/WalletBackup/WalletBackup';
import { TabItem, Tabs } from '@kadena/kode-ui';

export default function WalletPage() {
  return (
    <Tabs isContained>
      <TabItem key="Overview" title="Overview">
        <></>
      </TabItem>
      <TabItem key="Transactions" title="Transactions">
        <></>
      </TabItem>
      <TabItem key="Transfers" title="Transfers">
        <></>
      </TabItem>
      <TabItem key="Settings" title="Settings">
        <WalletBackup />
      </TabItem>
    </Tabs>
  );
}
