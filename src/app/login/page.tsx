"use client";

import { AccountSelector } from "@/components/AccountSelector";
import { LoginConfirmation } from "@/components/LoginConfirmation";
import { Box, ContentHeader, Stack } from "@kadena/react-ui";

type LoginProps = {
  searchParams: {
    returnUrl: string;
  };
};

export default function Login({ searchParams }: LoginProps) {
  const { returnUrl } = searchParams;
  return (
    <Stack direction="column" alignItems="center" paddingY="$lg">
      <Box>
        <ContentHeader
          description={`Which account do you want to use to identify on ${searchParams.returnUrl}?`}
          heading="Login"
          icon="Account"
        />

        <AccountSelector />

        <LoginConfirmation returnUrl={returnUrl} />
      </Box>
    </Stack>
  );
}
