'use client';

import { AccountDetails } from '@/components/AccountDetails/AccountDetails';
import { AccountTabs } from '@/components/AccountTabs/AccountTabs';
import { useAccounts } from '@/resolvers/accounts';
import { Stack } from '@kadena/kode-ui';
import { useParams } from 'next/navigation';
import { overviewWrapperClass } from '../style.css';

export default function TransactionsPage() {
  const params = useParams();
  const { accounts } = useAccounts();
  const raccount = decodeURIComponent(params.raccount.toString());
  const account = accounts?.find((a) => a.accountName === raccount);
  return (
    <AccountTabs selectedTabKey="transactions">
      <Stack
        gap="xl"
        width="100%"
        padding="lg"
        className={overviewWrapperClass}
      >
        {account && <AccountDetails account={account} />}
      </Stack>
    </AccountTabs>
  );
}
