import { useOrder } from '@/app/(examples)/v1/example/delivery/context/OrderContext';
import { Box, Heading, Stack, SystemIcon } from '@kadena/react-ui';
import Image from 'next/image';
import * as styles from './OrderSummary.css';

export function OrderSummary() {
  const { orderItems, orderTotalPrice } = useOrder();

  const orderedProducts = orderItems;

  if (orderItems.length === 0) {
    return (
      <Stack marginBlock="xl" justifyContent="center">
        <Heading variant="h5" as="h3">
          Please add some pizza to your order.
        </Heading>
      </Stack>
    );
  }

  return (
    <>
      <Stack marginBlock="xl" justifyContent="center">
        <Heading variant="h5" as="h3">
          Your order summary
        </Heading>
      </Stack>
      <Stack flexDirection="column" gap="md">
        {orderedProducts.map((product) => (
          <Stack alignItems="center" gap="sm" key={product.name}>
            <Image
              className={styles.productImage}
              src={product.image}
              alt={product.name}
            />
            <Box marginBlockStart="xs" style={{ flexGrow: 1 }}>
              <Heading variant="h6" as="h4">
                {product.name}
              </Heading>
              <div>
                {product.quantity} x $ {product.price.toFixed(2)}
              </div>
            </Box>
            <Heading
              variant="h6"
              as="h4"
              style={{ flexGrow: 1, textAlign: 'end' }}
            >
              $ {(product.quantity * product.price).toFixed(2)}
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
            $ 6.25
          </Heading>
        </Stack>
        <Stack marginBlockStart="xs" justifyContent="space-between">
          <Heading variant="h6" as="h4">
            Your order total:
          </Heading>
          <Heading variant="h6" as="h4">
            $ {(orderTotalPrice + 6.25).toFixed(2)}
          </Heading>
        </Stack>
      </Stack>
    </>
  );
}
