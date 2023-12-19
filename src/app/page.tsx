"use client";

import { ContentHeader, Stack } from "@kadena/react-ui";
import Link from "next/link";

export default function Home() {
  return (
    <Stack direction="column" gap="$md">
      <Stack direction="column" gap="$md" margin="$md">
        <ContentHeader
          heading="WebAuthn Wallet"
          description="Create or restore an account using WebAuthn"
          icon="Account"
        />
      </Stack>

      <Link href="/register">Register</Link>

      <Link href="/restore">Restore</Link>
    </Stack>
  );
}
