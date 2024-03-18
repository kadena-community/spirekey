'use client';

import { Stack } from '@kadena/react-ui';
import dynamic from 'next/dynamic';

const ConnectHeader = dynamic(
  () => import('@/components/shared/Connect/ConnectHeader'),
  {
    ssr: false,
  },
);

const CardCollection = dynamic(
  () => import('@/components/CardCollection/CardCollection'),
  { ssr: false },
);

type ConnectProps = {
  searchParams: {
    returnUrl: string;
    reason?: string;
    optimistic?: boolean;
    networkId: string;
  };
};

export default function Connect({ searchParams }: ConnectProps) {
  const { returnUrl, reason = '', optimistic = true, networkId } = searchParams;

  return (
    <Stack flexDirection="column" gap="lg" style={{ height: '100svh' }}>
      <ConnectHeader
        returnUrl={decodeURIComponent(returnUrl)}
        reason={decodeURIComponent(reason)}
        networkId={networkId}
      />
      <CardCollection
        returnUrl={decodeURIComponent(returnUrl)}
        optimistic={optimistic}
        networkId={networkId}
      />
    </Stack>
  );
}
