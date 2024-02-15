'use client';

import { useNetwork } from '@/context/NetworkContext';
import { fundAccount } from '@/utils/fund';
import {
  Box,
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
  const { network } = useNetwork();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const caccount = decodeURIComponent(params.caccount.toString());

  const handleFundAccount = async () => {
    try {
      setLoading(true);
      if (!caccount) throw new Error('No account selected');

      await fundAccount({ account: caccount, network });
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
    <Box margin={'lg'}>
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
    </Box>
  );
}
