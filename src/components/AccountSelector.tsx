'use client';

import { Account } from '@/components/Account/Account';
import { useAccounts } from '@/context/AccountsContext';
import dynamic from 'next/dynamic';

const CardCollection = dynamic(
  () => import('@/components/CardCollection/CardCollection'),
  { ssr: false },
);

type AccountSelectorProps = {
  returnUrl?: string;
  optimistic?: boolean;
};

export const AccountSelector = ({ returnUrl, optimistic = false }: AccountSelectorProps) => {
  const { accounts } = useAccounts();

  return (
    <CardCollection>
      {accounts.map((account) => (
        <Account
          key={account.accountName + account.network}
          account={account}
          returnUrl={returnUrl}
          optimistic={optimistic}
        />
      ))}
    </CardCollection>
  );
};
