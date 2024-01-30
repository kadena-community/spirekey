'use client';

import { AccountSelector } from '@/components/AccountSelector';
import { Box, Heading, Stack, SystemIcon } from '@kadena/react-ui';

export default function Accounts() {
  return (
    <Stack
      gap="md"
      flexDirection="column"
      alignItems="center"
      width="100%"
      style={{ height: '100svh' }}
    >
      <Stack
        paddingInline="lg"
        paddingBlock="md"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Heading variant="h5">Accounts</Heading>
        <SystemIcon.Application />
      </Stack>
      <AccountSelector />
    </Stack>
  );
}
