import { Box, Heading, Stack, SystemIcon } from '@kadena/react-ui';
import { ICap } from '@kadena/types';
import Image from 'next/image';
import { products } from '../mock/products';
import * as styles from './CreateOrder.css';

interface Props {
  capabilities: ICap[];
}

export function CreateOrder({ capabilities }: Props) {
  const orderLineCapabilities = capabilities.filter((capability) => {
    return (
      capability.name.includes('delivery.CREATE_ORDER_LINE') &&
      !capability.args.some((arg) => arg.toString() === 'Delivery')
    );
  });
  const deliveryCapability = capabilities.find((capability) => {
    return (
      capability.name.includes('delivery.CREATE_ORDER_LINE') &&
      capability.args.some((arg) => arg.toString() === 'Delivery')
    );
  });
  const transferCapability = capabilities.find((capability) =>
    capability.name.includes('webauthn-wallet.TRANSFER'),
  );
  const gasPayerCapability = capabilities.find((capability) =>
    capability.name.includes('webauthn-wallet.GAS_PAYER'),
  );

  // The customer signs for the gas payer capability
  const transferTitle = gasPayerCapability
    ? 'Your order total'
    : 'Transfer to escrow';

  return (
    <>
      <Stack flexDirection="column" gap="md" marginBlockEnd="xl">
        {orderLineCapabilities.map((capability, i) => (
          <Stack alignItems="center" gap="sm" key={i}>
            <Image
              className={styles.productImage}
              src={
                products.find((product) =>
                  capability.args[1].toString().includes(product.name),
                )?.image || ''
              }
              alt={capability.args[1].toString()}
            />
            <Box>
              <Heading variant="h6" as="h4">
                {capability.args[1].toString()}
              </Heading>
            </Box>
            <Heading
              variant="h6"
              as="h4"
              style={{ flexGrow: 1, textAlign: 'end' }}
            >
              ${' '}
              {Number(
                (capability.args[2] as { decimal: number }).decimal,
              ).toFixed(2)}
            </Heading>
          </Stack>
        ))}
        <Stack alignItems="center" gap="sm">
          <SystemIcon.MapMarker
            size="xl"
            style={{ marginInlineStart: '0.25rem' }}
          />
          <Box style={{ marginInlineStart: '0.5rem' }}>
            <Heading variant="h6" as="h4">
              Delivery
            </Heading>
          </Box>
          <Heading
            variant="h6"
            as="h4"
            style={{ flexGrow: 1, textAlign: 'end' }}
          >
            ${' '}
            {Number(
              (deliveryCapability?.args[2] as { decimal: number })?.decimal,
            ).toFixed(2)}
          </Heading>
        </Stack>
        <Stack marginBlockStart="xs" justifyContent="space-between">
          <Heading variant="h6" as="h4">
            {transferTitle}:
          </Heading>
          <Heading variant="h6" as="h4">
            ${' '}
            {Number(
              (transferCapability?.args[2] as { decimal: number })?.decimal,
            ).toFixed(2)}
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
