"use client";

import { useAccounts } from "@/hooks/useAccounts";
import { l1Client } from "@/utils/client";
import { ContentHeader, Stack } from "@kadena/react-ui";

const Register = () => {
  return (
    <Stack direction="column" gap="$md" margin="$md">
      <ContentHeader
        heading="WebAuthn Wallet"
        description="Create an account using WebAuthn"
        icon="Account"
      />
    </Stack>
  );
};

const Restore = () => {
  return (
    <Stack direction="column" gap="$md" margin="$md">
      <ContentHeader
        heading="WebAuthn Wallet"
        description="Restore an account using WebAuthn"
        icon="Account"
      />
    </Stack>
  );
};

export default function Home() {
  const { account } = useAccounts(l1Client);
  if (!account) <Register />;
  return <Restore />;
}
