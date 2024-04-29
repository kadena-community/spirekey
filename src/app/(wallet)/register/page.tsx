'use client';

import { ChainId } from '@kadena/client';
import { Stack } from '@kadena/react-ui';
import dynamic from 'next/dynamic';

const Registration = dynamic(
  () => import('@/components/Registration/Registration'),
  {
    ssr: false,
  },
);

interface Props {
  searchParams: {
    redirectUrl?: string;
    networkId?: string;
    chainIds?: ChainId[];
  };
}

export default function Register({ searchParams }: Props) {
  const { redirectUrl, networkId, chainIds } = searchParams;

  return (
    <Stack flexDirection="column" gap="md">
      <Registration
        redirectUrl={redirectUrl}
        networkId={networkId}
        chainIds={chainIds}
      />
    </Stack>
  );
}
