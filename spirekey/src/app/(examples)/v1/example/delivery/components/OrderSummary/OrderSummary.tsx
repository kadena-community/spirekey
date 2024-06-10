import { useOrder } from '@/app/(examples)/v1/example/delivery/context/OrderContext';
import { MonoLocationOn } from '@kadena/react-icons';
import { Box, Heading, Stack } from '@kadena/react-ui';
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
          <Stack
            alignItems="center"
            justifyContent="space-between"
            gap="sm"
            key={product.name}
          >
            <Stack flexDirection="row">
              <Image
                className={styles.productImage}
                src={product.image}
                alt={product.name}
              />
              <Box marginBlockStart="xs">
                <Heading variant="h6" as="h4">
                  {product.name}
                </Heading>
                <div>
                  {product.quantity} x $ {product.price.toFixed(2)}
                </div>
              </Box>
            </Stack>
            <Heading variant="h6">
              $ {(product.quantity * product.price).toFixed(2)}
            </Heading>
          </Stack>
        ))}
        <Stack alignItems="center" justifyContent="space-between" gap="sm">
          <Stack flexDirection="row" alignItems="center">
            <MonoLocationOn className={styles.mapMarker} />
            <Box className={styles.delivery}>
              <Heading variant="h6" as="h4">
                Delivery
              </Heading>
            </Box>
          </Stack>
          <Heading variant="h6">$ 6.25</Heading>
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
