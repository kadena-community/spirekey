'use client';

import { AccountDetails } from '@/components/AccountDetails/AccountDetails';
import { useNetwork } from '@/context/NetworkContext';
import { useAccounts } from '@/hooks/useAccounts';
import { Breadcrumbs, BreadcrumbsItem } from '@kadena/react-ui';
import { useParams } from 'next/navigation';
import React from 'react';

export default function TransactionsPage() {
  const params = useParams();
  const { accounts } = useAccounts();
  const { network } = useNetwork();
  const caccount = decodeURIComponent(params.caccount.toString());
  const account = accounts.find(a => a.name === caccount);

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbsItem href={`/accounts/${params.caccount}`}>
          {caccount}
        </BreadcrumbsItem>
        <BreadcrumbsItem
          href={`/accounts/${params.caccount}/devices/${params.cid}`}
        >
          {decodeURIComponent(params.cid.toString())}
        </BreadcrumbsItem>
        <BreadcrumbsItem>Transactions</BreadcrumbsItem>
      </Breadcrumbs>
      <h1>Transactions</h1>
      {account && <AccountDetails account={{
        accountName: account.name,
        network,
        balance: account.balance,
        devices: [],
      }}/>}
    </div>
  );
}
