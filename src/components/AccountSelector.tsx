'use client';

import { Account } from '@/components/Account/Account';
import CardCollection from '@/components/CardCollection/CardCollection';
import { useAccounts } from '@/hooks/useProfiles';

type AccountSelectorProps = {
  showLinks?: boolean;
  returnUrl?: string;
};

export const AccountSelector = ({ returnUrl }: AccountSelectorProps) => {
  const { accounts } = useAccounts();

  if (!accounts) return <div>loading...</div>;

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
