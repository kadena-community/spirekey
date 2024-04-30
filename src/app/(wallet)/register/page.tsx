'use client';

import { ChainId } from '@kadena/client';
import { Stack } from '@kadena/react-ui';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

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

export default function Register({
  searchParams: { redirectUrl, networkId },
}: Props) {
  const searchParams = useSearchParams();
  const chainIds =
    searchParams.getAll('chainId').length === 0
      ? [process.env.CHAIN_ID]
      : (searchParams.getAll('chainId') as ChainId[]);

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
