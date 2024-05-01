'use client';

import { useAccounts } from '@/context/AccountsContext';
import { useReturnUrl } from '@/hooks/shared/useReturnUrl';
import { SubmitStatus, useSubmit } from '@/hooks/shared/useSubmit';
import { continueCopy, copyAccount } from '@/utils/copyAccount';
import { l1Client } from '@/utils/shared/client';
import {
  Box,
  Button,
  Card,
  ContentHeader,
  Stack,
  SystemIcon,
} from '@kadena/react-ui';
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
  const { status, tx } = useSubmit({ transaction: '' });

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
        networkId: 'testnet04',
        publicKey: account.devices[0].guard.keys[0],
        targetChainId: '15',
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
      const txStep1 = JSON.parse(temp);
      l1Client.listen(txStep1).then(async (result: any) => {
        const spv = await l1Client.pollCreateSpv(txStep1, '15');
        const continueTx = await continueCopy({
          pactId: result.continuation?.pactId || '',
          rollback: false,
          step: 1,
          proof: spv,
        });
        const res = await l1Client.local(continueTx);
        if (res.result.status !== 'success') return console.error('Error', res);
        const submitRes = await l1Client.submit(continueTx);
        const listenRes = await l1Client.listen(submitRes);
        console.log('res', listenRes);
      });
    } else {
      l1Client.submit(tx).then((result: any) => {
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
            icon={<SystemIcon.Account />}
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
