'use client';

import { useAccounts } from '@/resolvers/accounts';
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

  useEffect(() => {
    if (!accounts.length) {
      router.replace('/welcome');
    }
  }, [accounts]);

  return <CardCollection />;
}
