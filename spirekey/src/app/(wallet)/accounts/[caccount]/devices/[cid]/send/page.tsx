'use client';

import SendForm from '@/components/SendForm/SendForm';
import { TabItem, Tabs } from '@kadena/kode-ui';

export default function SendPage() {
  return (
    <Tabs isContained>
      <TabItem key="Overview" title="Overview">
        <></>
      </TabItem>
      <TabItem key="Transactions" title="Transactions">
        <></>
      </TabItem>
      <TabItem key="Transfers" title="Transfers">
        <SendForm />
      </TabItem>
      <TabItem key="Settings" title="Settings">
        <></>
      </TabItem>
    </Tabs>
  );
}
