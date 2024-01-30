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
    <Stack flexDirection="column" gap="lg">
      <ContentHeader
        description={`Which account do you want to use to identify on ${searchParams.returnUrl}?`}
        heading="Login"
        icon="Account"
      />

      <AccountSelector returnUrl={returnUrl} />

      {/* <LoginConfirmation returnUrl={returnUrl} /> */}
    </Stack>
  );
}
