'use client';

import { Stack } from '@kadena/react-ui';
import { ChainId } from '@kadena/types';
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
  const {
    redirectUrl,
    networkId,
    chainId = process.env.CHAIN_ID as ChainId,
  } = searchParams;

  return (
    <Stack flexDirection="column" gap="md">
      <Registration
        redirectUrl={redirectUrl}
        networkId={networkId}
        chainId={chainId}
      />
    </Stack>
  );
}
