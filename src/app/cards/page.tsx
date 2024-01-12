'use client';

import { Card } from '@/components/Card/Card';
import CardCollection from '@/components/CardCollection/CardCollection';
import { Account } from '@/context/AccountsContext';
import { useAccounts } from '@/hooks/useProfiles';
import { Heading, Stack } from '@kadena/react-ui';
import { useState } from 'react';

export default function Cards() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeAccount, setActiveAccount] = useState<Account>();
  const { accounts } = useAccounts();

  const sortedAccounts = [...accounts].sort((a, b) => {
    if (
      a.accountName === activeAccount?.accountName &&
      a.network === activeAccount?.network
    )
      return -1;
    if (
      b.accountName === activeAccount?.accountName &&
      b.network === activeAccount?.network
    )
      return 1;
    return 0;
  });

  const onCardClick = (account: Account) => {
    setActiveAccount(isCollapsed ? undefined : account);
    setIsCollapsed(!isCollapsed);
  };

  if (!accounts) return <div>loading...</div>;

  return (
    <Stack
      gap="md"
      flexDirection="column"
      alignItems="center"
      width="100%"
      style={{ height: '100svh' }}
    >
      <Heading variant="h3" as="h1">
        Cards
      </Heading>
      <CardCollection>
        {sortedAccounts.map((account: any) => {
          if (!account) return null;

          const isActive =
            account.accountName === activeAccount?.accountName &&
            account.network === activeAccount?.network;
          return (
            <Card
              key={account.accountName + account.network}
              account={account}
              onClick={onCardClick}
              isCollapsed={isCollapsed}
              isActive={isActive}
            />
          );
        })}
      </CardCollection>
    </Stack>
  );
}
