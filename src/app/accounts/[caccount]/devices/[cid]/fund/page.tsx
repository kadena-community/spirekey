'use client';

import { fundAccount } from '@/utils/fund';
import {
  Breadcrumbs,
  BreadcrumbsItem,
  Button,
  Card,
  ContentHeader,
  Stack,
} from '@kadena/react-ui';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function FundPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const caccount = decodeURIComponent(params.caccount.toString());

  const handleFundAccount = async () => {
    try {
      setLoading(true);
      if (!caccount) throw new Error('No account selected');

      await fundAccount(caccount);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
      router.push(
        `/accounts/${params.caccount}/devices/${params.cid}/transactions`,
      );
    }
  };

  return (
    <>
      <Breadcrumbs>
        <BreadcrumbsItem href={`/accounts/${params.caccount}`}>
          {decodeURIComponent(params.caccount.toString())}
        </BreadcrumbsItem>
        <BreadcrumbsItem
          href={`/accounts/${params.caccount}/devices/${params.cid}`}
        >
          {decodeURIComponent(params.cid.toString())}
        </BreadcrumbsItem>
        <BreadcrumbsItem>Fund</BreadcrumbsItem>
      </Breadcrumbs>
      <Card fullWidth>
        <Stack flexDirection="column" gap="md" margin="md">
          <ContentHeader
            heading="Fund account"
            description="Add some funds to your account (Only works on Devnet or Testnet)"
            icon="Account"
          />
          <Button onClick={handleFundAccount}>
            {loading ? 'Loading...' : 'Fund account'}
          </Button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </Stack>
      </Card>
    </>
  );
}
