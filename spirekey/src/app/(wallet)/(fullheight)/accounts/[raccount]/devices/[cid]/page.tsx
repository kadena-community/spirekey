'use client';
import { AccountOverviewSection } from '@/components/AccountOverviewSection/AccountOverviewSection';
import { AccountTabs } from '@/components/AccountTabs/AccountTabs';
import DeviceIcons from '@/components/Card/DeviceIcons';
import { useAccounts } from '@/resolvers/accounts';
import { Stack } from '@kadena/kode-ui';
import { useParams } from 'next/navigation';
import React from 'react';
import { overviewWrapperClass } from './style.css';

export default function AccountPage() {
  const params = useParams();
  const { accounts } = useAccounts();
  const raccount = decodeURIComponent(params.raccount.toString());
  const cid = decodeURIComponent(params.cid.toString());
  const account = accounts?.find((a) => a.accountName === raccount);
  const device = account?.devices.find((d) => d['credential-id'] === cid);

  if (!account) return null;

  return (
    <AccountTabs selectedTabKey="root">
      <Stack
        gap="xl"
        width="100%"
        padding="lg"
        className={overviewWrapperClass}
      >
        <AccountOverviewSection label="Address">
          {raccount}
        </AccountOverviewSection>
        <AccountOverviewSection label="Passkey Provider">
          <DeviceIcons account={account} device={device} appendTitle isSmall />
        </AccountOverviewSection>
        <AccountOverviewSection label="Overall Balance (KDA)">
          {account.balance}
        </AccountOverviewSection>
      </Stack>
    </AccountTabs>
  );
}
