'use client';

import logo from '@/assets/images/bennuKey.svg';
import {
  useAccounts,
  type Account as TAccount,
} from '@/context/AccountsContext';
import { Heading, Stack } from '@kadena/react-ui';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const CardCollection = dynamic(
  () => import('@/components/CardCollection/CardCollection'),
  { ssr: false },
);

export default function Cards() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeAccount, setActiveAccount] = useState<TAccount>();
  const { accounts } = useAccounts();
  const { caccount, cid } = useParams();

  useEffect(() => {
    if (!activeAccount) {
      return;
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [activeAccount]);

  useEffect(() => {
    if (typeof caccount !== 'string' || !cid) {
      return;
    }
    // TODO: make sure the network is part of the url
    const c = decodeURIComponent(caccount);
    const account = accounts.find((a) => a.accountName === c);

    if (account) {
      setActiveAccount(account);
      setIsCollapsed(true);
    }
  }, [caccount, cid, accounts.length]);

  return (
    <Stack
      gap="md"
      flexDirection="column"
      alignItems="center"
      width="100%"
      style={{ height: '100svh' }}
    >
      <Image src={logo} alt="BennuKey logo" style={{ marginTop: '2rem' }} />
      <Heading variant="h5" as="h2" style={{ lineHeight: 0.8 }}>
        BennuKey
      </Heading>
      <Heading
        variant="h3"
        as="h1"
        style={{ marginTop: 0, lineHeight: 0.8, marginBottom: '2rem' }}
      >
        Wallet
      </Heading>
      <CardCollection />
    </Stack>
  );
}
