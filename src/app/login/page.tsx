'use client';

import { AccountSelector } from '@/components/AccountSelector';
import { Box, Stack } from '@kadena/react-ui';
import dynamic from 'next/dynamic';

const LoginHeader = dynamic(() => import('@/components/Login/LoginHeader'), {
  ssr: false,
});

const CardCollection = dynamic(
  () => import('@/components/CardCollection/CardCollection'),
  { ssr: false },
);

type LoginProps = {
  searchParams: {
    returnUrl: string;
    reason?: string;
    optimistic?: boolean;
  };
};

export default function Login({ searchParams }: LoginProps) {
  const { returnUrl, reason = '', optimistic = false } = searchParams;

  return (
    <Stack flexDirection="column" gap="lg" style={{ height: '100svh' }}>
      <LoginHeader returnUrl={returnUrl} reason={reason} />
      <Box height="100%">
        <CardCollection returnUrl={returnUrl} optimistic={optimistic} />
      </Box>
    </Stack>
  );
}
