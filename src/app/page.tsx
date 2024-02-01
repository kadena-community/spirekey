'use client';

import { AccountSelector } from '@/components/AccountSelector';
import { useAccounts } from '@/context/AccountsContext';
import { Heading, Stack, SystemIcon } from '@kadena/react-ui';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSWRConfig } from 'swr';

export default function Accounts() {
  const { mutate } = useSWRConfig();
  const { accounts, registrations } = useAccounts();
  const router = useRouter();

  useEffect(() => {
    if (! accounts.length) {
      router.replace('/welcome');
    }
  }, [accounts]);

  useEffect(() => {
    mutate('accounts');
  }, [registrations]);

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
      <AccountSelector />
    </Stack>
  );
}
