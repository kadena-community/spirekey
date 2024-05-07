'use client';

import type { ChainId } from '@kadena/client';
import { Stack } from '@kadena/react-ui';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

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
    networkId: string;
    reason?: string;
    optimistic?: boolean;
    chainId?: ChainId;
  };
};

export default function Connect({
  searchParams: {
    returnUrl,
    reason = '',
    optimistic = true,
    networkId,
    chainId = process.env.CHAIN_ID,
  },
}: ConnectProps) {
  const searchParams = useSearchParams();
  const chainIds = searchParams.getAll('chainId') as ChainId[];

  return (
    <Stack flexDirection="column" gap="lg" style={{ height: '100svh' }}>
      <ConnectHeader
        returnUrl={decodeURIComponent(returnUrl)}
        reason={decodeURIComponent(reason)}
        networkId={networkId}
        chainIds={chainIds.length ? chainIds : [chainId]}
      />
      <CardCollection
        returnUrl={decodeURIComponent(returnUrl)}
        optimistic={optimistic}
        networkId={networkId}
        chainId={chainId}
      />
    </Stack>
  );
}
