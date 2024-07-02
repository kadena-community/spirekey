'use client';

import { MonoSupervisorAccount } from '@kadena/react-icons';
import { Card, ContentHeader, Stack } from '@kadena/react-ui';
import Link from 'next/link';

export const AddWallet = () => {
  return (
    <Card fullWidth>
      <Stack flexDirection="column" gap="md" margin="md">
        <ContentHeader
          heading="WebAuthn Wallet"
          description="Add this wallet to an existing account"
          icon={<MonoSupervisorAccount />}
        />
        <Link href="/add-wallet">Add</Link>
      </Stack>
    </Card>
  );
};