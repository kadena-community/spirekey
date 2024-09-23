'use client';

import { AccountDetails } from '@/components/AccountDetails/AccountDetails';
import { AccountTabs } from '@/components/AccountTabs/AccountTabs';
import { useAccounts } from '@/resolvers/accounts';
import { useParams } from 'next/navigation';

export default function TransactionsPage() {
  const params = useParams();
  const { accounts } = useAccounts();
  const raccount = decodeURIComponent(params.raccount.toString());
  const account = accounts?.find((a) => a.accountName === raccount);
  return (
    <AccountTabs selectedTabKey="transactions">
      {account && <AccountDetails account={account} />}
    </AccountTabs>
  );
}
