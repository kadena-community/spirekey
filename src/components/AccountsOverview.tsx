'use client';

import { Account } from '@/context/AccountContext';
import { useAccounts } from '@/hooks/useAccounts';
import { TrackerCard } from '@kadena/react-ui';

type AccountOverviewProps = {
  account: Account;
};

const AccountOverview = ({ account }: AccountOverviewProps) => {
  return (
    <TrackerCard
      icon="ManageKda"
      labelValues={[
        { label: 'Account', value: account.account, isAccount: true },
        { label: 'Balance', value: account.balance },
        ...account.devices.map((d) => {
          return {
            label: d.name,
            value: `${d.domain} - ${d['credential-id']}`,
          };
        }),
      ]}
    />
  );
};

export const AccountsOverview = () => {
  const { accounts } = useAccounts();
  return accounts.map((a) => <AccountOverview key={a.account} account={a} />);
};
