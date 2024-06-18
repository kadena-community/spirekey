'use client';

import { Stack } from '@kadena/react-ui';
import type { ChainId } from '@kadena/client';
import dynamic from 'next/dynamic';

const Registration = dynamic(
  () => import('@/components/Registration/Registration'),
  {
    ssr: false,
  },
);

type Props = {
  searchParams: {
    redirectUrl?: string;
    networkId?: string;
    chainId?: ChainId;
  };
};

export default function Register({ searchParams }: Props) {
  const redirectUrl = searchParams.redirectUrl;
  const networkId = searchParams.networkId;
  const chainId = searchParams.chainId;

  return (
    <Stack flexDirection="column" gap="md">
      <Registration redirectUrl={redirectUrl} networkId={networkId} chainId={chainId} />
    </Stack>
  );
}
