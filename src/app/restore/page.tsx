"use client";

import { ContentHeader, Stack } from "@kadena/react-ui";

export const RestorePage = () => {
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
