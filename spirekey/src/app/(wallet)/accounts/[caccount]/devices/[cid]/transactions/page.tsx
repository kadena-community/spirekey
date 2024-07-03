'use client';

import { AccountDetails } from '@/components/AccountDetails/AccountDetails';
import { useAccounts } from '@/context/AccountsContext';
import { Box } from '@kadena/kode-ui';
import { useParams } from 'next/navigation';
import React from 'react';

export default function TransactionsPage() {
  const params = useParams();
  const { accounts } = useAccounts();
  const caccount = decodeURIComponent(params.caccount.toString());
  const account = accounts?.find((a) => a.accountName === caccount);

  return (
    <Box margin="lg">
      <h1>Transactions</h1>
      {account && <AccountDetails account={account} />}
    </Box>
  );
}
