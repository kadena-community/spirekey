'use client';

import { Breadcrumbs, BreadcrumbsItem } from '@kadena/react-ui';
import { useParams } from 'next/navigation';
import React from 'react';

export default function TransactionsPage() {
  const params = useParams();
  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbsItem href={`/accounts/${params.caccount}`}>
          {decodeURIComponent(params.caccount.toString())}
        </BreadcrumbsItem>
        <BreadcrumbsItem
          href={`/accounts/${params.caccount}/devices/${params.cid}`}
        >
          {decodeURIComponent(params.cid.toString())}
        </BreadcrumbsItem>
        <BreadcrumbsItem>Transactions</BreadcrumbsItem>
      </Breadcrumbs>
      <h1>Transactions</h1>
    </div>
  );
}
