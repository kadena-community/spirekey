'use client';

import SpireKeyLogoAnimated from '@/assets/images/spireKey-logo-animated.svg';
import { type ChainId } from '@kadena/client';
import { Stack } from '@kadena/kode-ui';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Connect = dynamic(() => import('@/components/Embedded/Connect'), {
  ssr: false,
});

const Sign = dynamic(() => import('@/components/Embedded/Sign'), {
  ssr: false,
});

export default function SidebarSign() {
  const [transaction, setTransaction] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<string | null>(null);
  const [networkId, setNetworkId] = useState<string | null>(null);
  const [chainId, setChainId] = useState<ChainId | null>(null);

  useEffect(() => {
    const getHash = () => {
      const params = new URLSearchParams(
        window.location.hash.replace(/^#/, '?'),
      );
      setTransaction(params.get('transaction'));
      setAccounts(params.get('accounts'));
      setNetworkId(params.get('networkId'));
      setChainId(params.get('chainId') as ChainId);
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

  if (transaction)
    return <Sign transaction={transaction} accounts={accounts || '[]'} />;
  if (networkId && chainId)
    return <Connect networkId={networkId} chainId={chainId} />;
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
