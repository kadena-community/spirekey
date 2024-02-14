'use client';

import { AccountSelector } from '@/components/AccountSelector';
import { Box, ContentHeader, Stack } from '@kadena/react-ui';

type LoginProps = {
  searchParams: {
    returnUrl: string;
    reason?: string;
  };
};

export default function Login({ searchParams }: LoginProps) {
  const { returnUrl, reason } = searchParams;

  const displayReason =
    reason &&
    ` The reason provided by the dApp for this request is: ${searchParams.reason}`;

  return (
    <Stack flexDirection="column" gap="lg" style={{ height: '100svh' }}>
      <ContentHeader
        description={`Which account do you want to use to identify on ${searchParams.returnUrl}?${displayReason}`}
        heading="Login"
        icon="Account"
      />

      <Box height="100%">
        <AccountSelector returnUrl={returnUrl} />
      </Box>
    </Stack>
  );
}
