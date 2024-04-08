'use client';

import { Stack } from '@kadena/react-ui';
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
  };
};

export default function Register({ searchParams }: Props) {
  const redirectUrl = searchParams.redirectUrl;
  const networkId = searchParams.networkId;

  return (
    <Stack flexDirection="column" gap="md">
      <Registration redirectUrl={redirectUrl} networkId={networkId} />
    </Stack>
  );
}
