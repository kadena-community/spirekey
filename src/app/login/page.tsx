"use client";

import { AccountSelector } from "@/components/AccountSelector";
import { LoginConfirmation } from "@/components/LoginConfirmation";
import { useAccountSelector } from "@/hooks/useAccountSelector";
import { Box, ContentHeader, Stack } from "@kadena/react-ui";

type LoginProps = {
  searchParams: {
    returnUrl: string;
  };
};

export default function Login({ searchParams }: LoginProps) {
  const { returnUrl } = searchParams;
  const {
    accounts,
    account,
    device,
    onAccountChange,
    onDeviceChange,
    onRestore,
  } = useAccountSelector();
  const onRestoreAccount = (caccount: string) =>
    onRestore({
      caccount,
      networkId: process.env.NETWORK_ID || "testnet04",
      namespace:
        process.env.NAMESPACE || "n_999ab0660c701e0c19ce8a529f2ed22c15127d41",
    });

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
          onDeviceChange={onDeviceChange}
          accounts={accounts}
          onRestore={onRestoreAccount}
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
