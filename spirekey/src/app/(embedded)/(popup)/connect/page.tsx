'use client';

import SpireKeyLogoAnimated from '@/assets/images/spireKey-logo-animated.svg';
import Connect from '@/components/Embedded/Connect';
import { type ChainId } from '@kadena/client';
import { Stack } from '@kadena/kode-ui';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function SidebarSign() {
  const [networkId, setNetworkId] = useState<string | null>(null);
  const [chainId, setChainId] = useState<ChainId | null>(null);

  useEffect(() => {
    const getHash = () => {
      const params = new URLSearchParams(
        window.location.hash.replace(/^#/, '?'),
      );
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
