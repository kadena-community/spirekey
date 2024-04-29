import {
  Product as IProduct,
  useOrder,
} from '@/app/(examples)/v1/example/delivery/context/OrderContext';
import { Button } from '@/components/shared/Button/Button';
import { Box, Heading, Stack, Text } from '@kadena/react-ui';
import Image from 'next/image';
import * as styles from './Product.css';

interface Props {
  product: IProduct;
}

export function Product({ product }: Props) {
  const { addOrderItem, removeOrderItem, orderItems } = useOrder();

  const onDecrementOrderItem = (productName: string) => () =>
    removeOrderItem(productName);
  const onIncrementOrderItem = (productName: string) => () =>
    addOrderItem(productName);

  const orderItemAmount =
    orderItems.find((item) => item.name === product.name)?.quantity || 0;

  return (
    <Stack flexDirection="column">
      <Image
        className={styles.productImage}
        src={product.image}
        alt={product.name}
      />
      <Stack justifyContent="space-between">
        <Box marginBlockStart="xs">
          <Heading variant="h5" as="h3">
            {product.name}
          </Heading>
          <div>$ {product.price.toFixed(2)}</div>
        </Box>
        <Stack
          gap="sm"
          alignItems="flex-start"
          justifyContent="center"
          marginBlockStart="sm"
        >
          <Button
            onPress={onDecrementOrderItem(product.name)}
            className={styles.quantityButton}
          >
            -
          </Button>
          <Text className={styles.orderItemAmount}>{orderItemAmount}</Text>
          <Button
            onPress={onIncrementOrderItem(product.name)}
            className={styles.quantityButton}
          >
            +
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
