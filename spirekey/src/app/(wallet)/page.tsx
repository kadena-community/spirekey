'use client';

import { Background } from '@/components/Background/Background';
import { PageTitle } from '@/components/Layout/PageTitle';
import { useAccounts } from '@/context/AccountsContext';
import { Stack } from '@kadena/react-ui';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const CardCollection = dynamic(
  () => import('@/components/CardCollection/CardCollection'),
  { ssr: false },
);

export default function Accounts() {
  const { accounts } = useAccounts();
  const router = useRouter();

  useEffect(() => {
    if (!accounts.length) {
      router.replace('/welcome');
    }
  }, [accounts]);

  return (
    <>
      {process.env.E2E_TEST !== 'true' && <Background />}
      <Stack
        gap="md"
        flexDirection="column"
        alignItems="center"
        width="100%"
        style={{ height: '100svh' }}
      >
        <PageTitle
          append={
            process.env.DEV_MODE_SETTINGS_PAGE === 'true' && (
              <Link href="/settings">Settings</Link>
            )
          }
        >
          Accounts
        </PageTitle>

        <CardCollection />
      </Stack>
    </>
  );
}
