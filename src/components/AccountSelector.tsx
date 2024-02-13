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
};

export const AccountSelector = ({ returnUrl }: AccountSelectorProps) => {
  const { accounts } = useAccounts();

  return (
    <CardCollection>
      {accounts.map((account) => (
        <Account
          key={account.accountName + account.network}
          account={account}
          returnUrl={returnUrl}
        />
      ))}
    </CardCollection>
  );
};
