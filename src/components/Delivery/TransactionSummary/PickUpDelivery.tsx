import { Box, Heading, Stack, SystemIcon, maskValue } from '@kadena/react-ui';
import { ICap } from '@kadena/types';

interface Props {
  capabilities: ICap[];
}

export function PickUpDelivery({ capabilities }: Props) {
  const pickUpDeliveryCapability = capabilities.find((capability) =>
    capability.name.includes('delivery.PICKUP_DELIVERY'),
  );
  const transferCapability = capabilities.find((capability) =>
    capability.name.includes('webauthn-wallet.TRANSFER'),
  );
  const gasPayerCapability = capabilities.find((capability) =>
    capability.name.includes('webauthn-wallet.GAS_PAYER'),
  );

  console.log(pickUpDeliveryCapability);

  return (
    <>
      <Stack flexDirection="column" gap="md" marginBlockEnd="xl">
        {pickUpDeliveryCapability && (
          <Stack alignItems="center" gap="sm">
            <SystemIcon.MapMarker size="xl" />
            <Box>
              <Heading variant="h6" as="h4">
                Pick up order{' '}
                {maskValue(pickUpDeliveryCapability.args[0].toString())}
              </Heading>
            </Box>
          </Stack>
        )}
        {transferCapability && (
          <Stack marginBlockStart="xs" justifyContent="space-between">
            <Heading variant="h6" as="h4">
              Transfer to escrow
            </Heading>
            <Heading variant="h6" as="h4">
              ${' '}
              {Number(
                (transferCapability?.args[2] as { decimal: number }).decimal,
              ).toFixed(2)}
            </Heading>
          </Stack>
        )}
        {gasPayerCapability && (
          <Stack marginBlockStart="xs" justifyContent="space-between">
            <Heading variant="h6" as="h4">
              + max transaction fee
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
