'use client';

import { useAccounts } from '@/context/AccountsContext';
import { useNotifications } from '@/context/NotificationsContext';
import { Heading, Stack, SystemIcon } from '@kadena/react-ui';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const CardCollection = dynamic(
  () => import('@/components/CardCollection/CardCollection'),
  { ssr: false },
);

export default function Accounts() {
  const { accounts } = useAccounts();
  const router = useRouter();
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (!accounts.length) {
      router.replace('/welcome');
    }
  }, [accounts]);

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
