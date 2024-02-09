'use client';

import logo from '@/assets/images/bennuKey.svg';
import { Account } from '@/components/Account/Account';
import CardCollection from '@/components/CardCollection/CardCollection';
import { Account as TAccount } from '@/context/AccountsContext';
import { useAccounts } from '@/hooks/useProfiles';
import { Heading, Stack } from '@kadena/react-ui';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Cards() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeAccount, setActiveAccount] = useState<TAccount>();
  const { accounts } = useAccounts();
  const { caccount, cid } = useParams();

  const sortedAccounts = [...(accounts || [])].sort((a, b) => {
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

  if (!accounts) return <div>loading...</div>;

  useEffect(() => {
    if (!activeAccount) {
      return;
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [activeAccount]);

  useEffect(() => {
    if (typeof caccount !== 'string' || !cid) {
      return;
    }
    // TODO: make sure the network is part of the url
    const c = decodeURIComponent(caccount);
    const account = accounts.find((a) => a.accountName === c);

    if (account) {
      setActiveAccount(account);
      setIsCollapsed(true);
    }
  }, [caccount, cid, accounts.length]);

  return (
    <Stack
      gap="md"
      flexDirection="column"
      alignItems="center"
      width="100%"
      style={{ height: '100svh' }}
    >
      <Image src={logo} alt="BennuKey logo" style={{ marginTop: '2rem' }} />
      <Heading variant="h5" as="h2" style={{ lineHeight: 0.8 }}>
        BennuKey
      </Heading>
      <Heading
        variant="h3"
        as="h1"
        style={{ marginTop: 0, lineHeight: 0.8, marginBottom: '2rem' }}
      >
        Wallet
      </Heading>
      <CardCollection>
        {sortedAccounts.map((account: any) => {
          if (!account) return null;

          const isActive =
            account.accountName === activeAccount?.accountName &&
            account.network === activeAccount?.network;
          return (
            <Account
              key={account.accountName + account.network}
              account={account}
              isActive={isActive}
            />
          );
        })}
      </CardCollection>
    </Stack>
  );
}
