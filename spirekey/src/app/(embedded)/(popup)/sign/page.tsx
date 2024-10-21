'use client';

import SpireKeyLogoAnimated from '@/assets/images/icon-dark.svg';
import Sign from '@/components/Embedded/Sign';
import { Stack } from '@kadena/kode-ui';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function SidebarSign() {
  const [transactions, setTransactions] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<string | null>(null);

  useEffect(() => {
    const getHash = () => {
      const params = new URLSearchParams(
        window.location.hash.replace(/^#/, '?'),
      );
      setTransactions(params.get('transactions'));
      setAccounts(params.get('accounts'));
    };

    const onHashChanged = () => {
      getHash();
    };

    getHash();
    window.addEventListener('hashchange', onHashChanged);

    return () => {
      window.removeEventListener('hashchange', onHashChanged);
    };
  }, []);

  if (transactions)
    return <Sign transactions={transactions} accounts={accounts || '[]'} />;

  return (
    <Stack alignItems="center" justifyContent="center" height="100%">
      <Image
        src={SpireKeyLogoAnimated}
        alt="Connecting account.."
        height={128}
        width={128}
      />
    </Stack>
  );
}
