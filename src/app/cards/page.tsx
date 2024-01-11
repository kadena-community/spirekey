'use client';

import { useNetwork } from '@/context/NetworkContext';
import { useAccounts } from '@/hooks/useProfiles';
import { Box, Heading, MaskedValue, Stack, Text } from '@kadena/react-ui';

export default function Cards() {
  const { accounts } = useAccounts();
  const { network } = useNetwork();
  if (!accounts) return <div>loading...</div>;
  return (
    <Stack gap="md" flexDirection="column" alignItems="center">
      <Box textAlign="center">
        <Heading variant="h3" as="h1">
          Cards
        </Heading>
      </Box>
      {accounts.map((account) => (
        <Box
          borderStyle="solid"
          borderWidth="hairline"
          borderRadius="md"
          borderColor="brand.primary.default"
          padding="md"
          style={{
            width: '20rem',
          }}
        >
          <Heading variant="h5" as="h2">
            {account.devices.map((d) => d.identifier).join(', ')}
          </Heading>

          <MaskedValue value={account.accountName} />

          <Text>{network}</Text>
        </Box>
      ))}
    </Stack>
  );
}
