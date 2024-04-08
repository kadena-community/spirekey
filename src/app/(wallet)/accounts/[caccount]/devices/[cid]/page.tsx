'use client';

import { useAccounts } from '@/context/AccountsContext';
import { Heading, Stack, SystemIcon } from '@kadena/react-ui';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

const CardCollection = dynamic(
  () => import('@/components/CardCollection/CardCollection'),
  { ssr: false },
);

export default function Cards() {
  const { accounts } = useAccounts();
  const { caccount, cid } = useParams();

  if (typeof caccount !== 'string' || !cid) {
    return <p>Account not found</p>;
  }
  // TODO: make sure the network is part of the url
  const c = decodeURIComponent(caccount);
  const account = accounts.find((a) => a.accountName === c);

  if (accounts.length && !account) {
    return <p>Account not found</p>;
  }

  return (
    <Stack
      gap="md"
      flexDirection="column"
      alignItems="center"
      width="100%"
      style={{ height: '100svh' }}
    >
      <Stack
        paddingInline="lg"
        paddingBlock="md"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Heading variant="h5">Accounts</Heading>
        <SystemIcon.Application />
      </Stack>
      <CardCollection />
    </Stack>
  );
}
