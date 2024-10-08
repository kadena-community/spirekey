'use client';

import { useAccounts } from '@/resolvers/accounts';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AccountCollection = dynamic(
  () => import('@/components/AccountCollection/AccountCollection'),
  { ssr: false },
);

export default function Accounts() {
  const { accounts, loading } = useAccounts();
  const router = useRouter();

  useEffect(() => {
    if (!accounts.length && !loading) {
      router.replace('/welcome');
    }
  }, [accounts, loading]);

  return <AccountCollection />;
}
