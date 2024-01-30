'use client';

import { AccountSelector } from '@/components/AccountSelector';
import { Box, ContentHeader, Stack } from '@kadena/react-ui';

type LoginProps = {
  searchParams: {
    returnUrl: string;
  };
};

export default function Login({ searchParams }: LoginProps) {
  const { returnUrl } = searchParams;
  return (
    <Stack flexDirection="column" gap="lg" style={{ height: '100svh' }}>
      <ContentHeader
        description={`Which account do you want to use to identify on ${searchParams.returnUrl}?`}
        heading="Login"
        icon="Account"
      />

      <Box height="100%">
        <AccountSelector returnUrl={returnUrl} />

        {/* <LoginConfirmation returnUrl={returnUrl} /> */}
      </Box>
    </Stack>
  );
}
