import { Heading, Stack, SystemIcon, maskValue } from '@kadena/react-ui';
import { ICap } from '@kadena/types';

interface Props {
  capabilities: ICap[];
}

export function DeliverOrder({ capabilities }: Props) {
  const deliveryCapability = capabilities.find((capability) =>
    capability.name.includes('delivery.DELIVER_ORDER'),
  );
  const gasPayerCapability = capabilities.find((capability) =>
    capability.name.includes('webauthn-wallet.GAS_PAYER'),
  );

  return (
    <>
      <Stack flexDirection="column" gap="md" marginBlockEnd="xl">
        <Stack alignItems="center" gap="sm">
          <SystemIcon.Check size="xl" />
          <Heading variant="h6" as="h4">
            Delivery of order{' '}
            {maskValue(deliveryCapability?.args[0].toString() || '')}
          </Heading>
        </Stack>
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
