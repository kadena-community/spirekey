'use client';

import { MonoSupervisorAccount } from '@kadena/kode-icons/system';
import { Card, ContentHeader, Stack } from '@kadena/kode-ui';
import Link from 'next/link';

export const Restore = () => {
  return (
    <Card fullWidth>
      <Stack flexDirection="column" gap="md" margin="md">
        <ContentHeader
          heading="WebAuthn Wallet"
          description="Restore an account using WebAuthn"
          icon={<MonoSupervisorAccount />}
        />
        <Link href="/restore">Restore</Link>
      </Stack>
    </Card>
  );
};
