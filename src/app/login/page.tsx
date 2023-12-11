"use client";

import { AccountSelector } from "@/components/AccountSelector";
import { LoginConfirmation } from "@/components/LoginConfirmation";
import { useAccountSelector } from "@/hooks/useAccountSelector";
import { Box, Button, ContentHeader, Stack } from "@kadena/react-ui";

type LoginProps = {
  searchParams: {
    returnUrl: string;
  };
};

export default function Login({ searchParams }: LoginProps) {
  const { returnUrl } = searchParams;
  const { accounts, account, device, onAccountChange } = useAccountSelector();
  return (
    <Stack direction="column" alignItems="center" paddingY="$lg">
      <Box>
        <ContentHeader
          description={`Which account do you want to use to identify on ${searchParams.returnUrl}?`}
          heading="Login"
          icon="Account"
        />
        <AccountSelector
          account={account}
          device={device}
          onAccountChange={onAccountChange}
          accounts={accounts}
        />
        <LoginConfirmation
          account={account}
          device={device}
          returnUrl={returnUrl}
        />
      </Box>
    </Stack>
  );
}
