'use client';

import { PageTitle } from '@/components/Layout/PageTitle';
import { useAccounts } from '@/context/AccountsContext';
import { Stack } from '@kadena/kode-ui';
import { tokens } from '@kadena/kode-ui/styles';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import * as styles from './main.css';

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
      <Stack
        gap="md"
        flexDirection="column"
        alignItems="center"
        marginInline="auto"
        width="100%"
        className={styles.contentContainer}
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
