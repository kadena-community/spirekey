'use client';

import WalletBackup from '@/components/WalletBackup/WalletBackup';
import { TabItem, Tabs } from '@kadena/kode-ui';

export default function WalletPage() {
  return (
    <Tabs isContained defaultSelectedKey="settings">
      <TabItem key="overview" title="Overview">
        <></>
      </TabItem>
      <TabItem key="transactions" title="Transactions">
        <></>
      </TabItem>
      <TabItem key="transfers" title="Transfers">
        <></>
      </TabItem>
      <TabItem key="settings" title="Settings">
        <WalletBackup />
      </TabItem>
    </Tabs>
  );
}
