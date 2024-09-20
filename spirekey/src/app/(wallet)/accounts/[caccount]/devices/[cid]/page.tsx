'use client';
import { TabItem, Tabs } from '@kadena/kode-ui';

export default function AccountPage() {
  return (
    <Tabs isContained>
      <TabItem key="Overview" title="Overview">
        overview
      </TabItem>
      <TabItem key="Transactions" title="Transactions">
        <></>
      </TabItem>
      <TabItem key="Transfers" title="Transfers">
        <></>
      </TabItem>
      <TabItem key="Settings" title="Settings">
        <></>
      </TabItem>
    </Tabs>
  );
}
