'use client';

import { Box } from '@kadena/react-ui';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Connect = dynamic(() => import('@/components/Embedded/Connect'), {
  ssr: false,
});

const Sign = dynamic(() => import('@/components/Embedded/Sign'), {
  ssr: false,
});

export default function SidebarSign() {
  const [transaction, setTransaction] = useState<string | null>(null);

  useEffect(() => {
    const getHash = () => {
      const params = new URLSearchParams(
        window.location.hash.replace(/^#/, '?'),
      );
      if (params.get('transaction')) {
        setTransaction(params.get('transaction'));
      }
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

  return (
    <Box
      style={{
        width: '100%',
        height: '100%',
        padding: '25px',
        background: 'rgba(19, 30, 43, 0.8)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: '48px',
      }}
    >
      {transaction && <Sign transaction={transaction} />}
      {!transaction && <Connect />}
    </Box>
  );
}
