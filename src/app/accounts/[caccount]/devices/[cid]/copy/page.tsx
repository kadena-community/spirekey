'use client';

import { useAccounts } from '@/context/AccountsContext';
import { useReturnUrl } from '@/hooks/useReturnUrl';
import { SubmitStatus, useSubmit } from '@/hooks/useSubmit';
import { l1Client } from '@/utils/client';
import { continueCopy, copyAccount } from '@/utils/copyAccount';
import { Box, Button, Card, ContentHeader, Stack } from '@kadena/react-ui';
import type { ChainId } from '@kadena/types';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function CopyPage() {
  const params = useParams();
  const router = useRouter();
  const { accounts } = useAccounts();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const { getReturnUrl } = useReturnUrl();
  const { status, doSubmit, tx } = useSubmit({ transaction: '' });

  const caccount = decodeURIComponent(params.caccount.toString());

  const account = accounts.find((a) => a.accountName === caccount);

  const handleCopyAccount = async () => {
    if (!account) return;

    try {
      setLoading(true);
      if (!caccount) throw new Error('No account selected');

      const tx = await copyAccount({
        accountName: caccount,
        chainId: process.env.CHAIN_ID as ChainId,
        networkId: 'development',
        publicKey: account.devices[0].guard.keys[0],
        targetChainId: '3',
      });
      router.push(
        `/sign?transaction=${Buffer.from(JSON.stringify(tx)).toString('base64')}&returnUrl=${getReturnUrl()}`,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status !== SubmitStatus.SUBMITABLE) return;
    const temp = localStorage.getItem('temp');
    if (temp) {
      // handle spv
      console.log('temp', temp);
      const txStep1 = JSON.parse(temp);
      console.log('txStep1', txStep1);
      l1Client.listen(txStep1).then(async (result) => {
        console.log('result', result);
        const spv = await l1Client.pollCreateSpv(txStep1, '3');
        console.log('spv', spv);
        const continueTx = await continueCopy({
          pactId: result.continuation?.pactId || '',
          rollback: false,
          step: 1,
          proof: spv,
        });
        console.log('continueTx', continueTx);
        const res = await l1Client.local(continueTx);
        console.log('res', res);
      });
    } else {
      l1Client.submit(tx).then((result) => {
        console.log('result', result);
        localStorage.setItem('temp', JSON.stringify(result));
      });
    }
  }, [status]);

  if (!account) {
    return <p>Account not found</p>;
  }

  return (
    <Box margin="lg">
      <Card fullWidth>
        <Stack flexDirection="column" gap="md" margin="md">
          <ContentHeader
            heading="Copy account"
            description="Copy account to a different chain."
            icon="Account"
          />
          <Button onClick={handleCopyAccount}>
            {loading ? 'Loading...' : 'Copy account'}
          </Button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </Stack>
      </Card>
    </Box>
  );
}
