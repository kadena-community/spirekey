'use client';

import { AccountDetails } from '@/components/AccountDetails/AccountDetails';
import { useAccounts } from '@/resolvers/accounts';
import { TabItem } from '@kadena/kode-ui';
import { useParams } from 'next/navigation';

export default function TransactionsPage() {
  const params = useParams();
  const { accounts } = useAccounts();
  const caccount = decodeURIComponent(params.caccount.toString());
  const account = accounts?.find((a) => a.accountName === caccount);
  return (
    <>
      <TabItem key="Overview" title="Overview">
        <></>
      </TabItem>
      <TabItem key="Transactions" title="Transactions">
        {account && <AccountDetails account={account} />}
      </TabItem>
      <TabItem key="Transfers" title="Transfers">
        <></>
      </TabItem>
      <TabItem key="Settings" title="Settings">
        <></>
      </TabItem>
    </>
  );
}
