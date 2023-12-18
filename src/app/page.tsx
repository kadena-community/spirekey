"use client";

import { ContentHeader, Stack } from "@kadena/react-ui";
import Link from "next/link";

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
      <Link href="/restore">Restore</Link>
    </Stack>
  );
};

export default function Home() {
  return (
    <Stack direction="column" gap="$md">
      <Register />
      <Restore />
    </Stack>
  );
}
