'use client';

import { useAccounts } from '@/context/AccountsContext';
import { fundAccount } from '@/utils/fund';
import { MonoSupervisorAccount } from '@kadena/kode-icons/system';
import { Box, Button, Card, ContentHeader, Stack } from '@kadena/kode-ui';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function FundPage() {
  const params = useParams();
  const router = useRouter();
  const { accounts } = useAccounts();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const caccount = decodeURIComponent(params.caccount.toString());

  const account = accounts.find((a) => a.accountName === caccount);

  const handleFundAccount = async () => {
    if (!account) return;

    try {
      setLoading(true);
      if (!caccount) throw new Error('No account selected');

      await fundAccount(account);
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

  if (!account) {
    return <p>Account not found</p>;
  }

  return (
    <Box margin="lg">
      <Card fullWidth>
        <Stack flexDirection="column" gap="md" margin="md">
          <ContentHeader
            heading="Fund account"
            description="Add some funds to your account (Only works on Devnet or Testnet)"
            icon={<MonoSupervisorAccount />}
          />
          <Button onClick={handleFundAccount}>
            {loading ? 'Loading...' : 'Fund account'}
          </Button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </Stack>
      </Card>
    </Box>
  );
}
