import { Box, Heading, Stack, SystemIcon } from '@kadena/react-ui';
import { ICap } from '@kadena/types';

interface Props {
  capabilities: ICap[];
}

export function SetReadyForDelivery({ capabilities }: Props) {
  const setReadyForDeliveryCapability = capabilities.find((capability) =>
    capability.name.includes('delivery.SET_READY_FOR_DELIVERY'),
  );
  const gasPayerCapability = capabilities.find((capability) =>
    capability.name.includes('webauthn-wallet.GAS_PAYER'),
  );

  return (
    <>
      <Stack flexDirection="column" gap="md" marginBlockEnd="xl">
        {setReadyForDeliveryCapability && (
          <Stack alignItems="center" gap="sm">
            <SystemIcon.Check
              size="xl"
              style={{ marginInlineStart: '0.25rem' }}
            />
            <Box style={{ marginInlineStart: '0.5rem' }}>
              <Heading variant="h6" as="h4">
                The order is ready for delivery!
              </Heading>
            </Box>
          </Stack>
        )}
        {gasPayerCapability && (
          <Stack marginBlockStart="xs" justifyContent="space-between">
            <Heading variant="h6" as="h4">
              Max transaction fee:
            </Heading>
            <Heading variant="h6" as="h4">
              $ {(gasPayerCapability?.args[2] as number).toFixed(2)}
            </Heading>
          </Stack>
        )}
      </Stack>
    </>
  );
}
