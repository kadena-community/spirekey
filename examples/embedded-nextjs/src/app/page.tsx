'use client';

import { ConnectStep } from '@/steps/Connect';
import { ResultStep } from '@/steps/ResultStep';
import { FundStep } from '@/steps/FundStep';
import { TransferStep } from '@/steps/TransferStep';
import { Stack } from '@kadena/kode-ui';
import { type Account } from '@kadena/spirekey-sdk';
import { useState } from 'react';

export default function Home() {
  const [account, setAccount] = useState<Account>();
  const [result, setResult] = useState('');

  const getStep = () => {
    if (!account) return <ConnectStep setAccount={setAccount} />;
    if (result) return <ResultStep result={result} />;

    if (parseFloat(account.balance) < 1)
      return <FundStep setAccount={setAccount} account={account} />;
    return <TransferStep setResult={setResult} account={account} />;
  };

  return (
    <Stack
      padding="md"
      marginInline="auto"
      flexDirection="column"
      gap="md"
      as="main"
      maxWidth="content.maxWidth"
    >
      {getStep()}
    </Stack>
  );
}
