'use client';

import { AccountDetails } from '@/components/AccountDetails/AccountDetails';
import { AccountTabs } from '@/components/AccountTabs/AccountTabs';
import { useAccounts } from '@/resolvers/accounts';
import { useParams } from 'next/navigation';

export default function TransactionsPage() {
  const params = useParams();
  const { accounts } = useAccounts();
  const caccount = decodeURIComponent(params.caccount.toString());
  const account = accounts?.find((a) => a.accountName === caccount);
  return (
    <AccountTabs selectedTabKey="transactions">
      {account && <AccountDetails account={account} />}
    </AccountTabs>
  );
}
