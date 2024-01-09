'use client';

import { Card, ContentHeader, Stack } from '@kadena/react-ui';
import Link from 'next/link';

export const Restore = () => {
  return (
    <Card fullWidth>
      <Stack direction="column" gap="$md" margin="$md">
        <ContentHeader
          heading="WebAuthn Wallet"
          description="Restore an account using WebAuthn"
          icon="Account"
        />
        <Link href="/restore">Restore</Link>
      </Stack>
    </Card>
  );
};
