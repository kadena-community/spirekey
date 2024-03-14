'use client';

import { Stack } from '@kadena/react-ui';
import dynamic from 'next/dynamic';

const LoginHeader = dynamic(
  () => import('@/components/shared/Login/LoginHeader'),
  {
    ssr: false,
  },
);

const CardCollection = dynamic(
  () => import('@/components/CardCollection/CardCollection'),
  { ssr: false },
);

type LoginProps = {
  searchParams: {
    returnUrl: string;
    reason?: string;
    optimistic?: boolean;
    networkId: string;
  };
};

export default function Login({ searchParams }: LoginProps) {
  const {
    returnUrl,
    reason = '',
    optimistic = false,
    networkId,
  } = searchParams;

  return (
    <Stack flexDirection="column" gap="lg" style={{ height: '100svh' }}>
      <LoginHeader
        returnUrl={returnUrl}
        reason={Buffer.from(reason, 'base64').toString()}
        networkId={networkId}
      />
      <CardCollection
        returnUrl={returnUrl}
        optimistic={optimistic}
        networkId={networkId}
      />
    </Stack>
  );
}
