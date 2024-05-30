'use client';

import { Card, ContentHeader, Stack, SystemIcon } from '@kadena/react-ui';
import Link from 'next/link';

export const Restore = () => {
  return (
    <Card fullWidth>
      <Stack flexDirection="column" gap="md" margin="md">
        <ContentHeader
          heading="WebAuthn Wallet"
          description="Restore an account using WebAuthn"
          icon={<SystemIcon.Account />}
        />
        <Link href="/restore">Restore</Link>
      </Stack>
    </Card>
  );
};
