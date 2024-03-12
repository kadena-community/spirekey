import { Order } from '@/app/v1/example/delivery/useDelivery';
import { Surface } from '@/components/Surface/Surface';
import { Heading, Stack, SystemIcon, maskValue } from '@kadena/react-ui';
import * as styles from './PickUpApproval.css';

interface Props {
  order: Order;
}

export function PickUpApproval({ order }: Props) {
  return (
    <>
      <Surface>
        <Stack flexDirection="column" marginBlockEnd="md">
          <Stack
            justifyContent="space-between"
            alignItems="flex-start"
            marginBlockEnd="md"
          >
            <Heading variant="h5" color="emphasize">
              Delivery price: $ {order.deliveryPrice.toFixed(2)}
            </Heading>
            <SystemIcon.Loading size="lg" className={styles.loader} />
          </Stack>
        </Stack>
        <Heading variant="h6" color="emphasize">
          Merchant: {maskValue(order.merchant)}
        </Heading>
        <Heading variant="h6" color="emphasize">
          Customer: {maskValue(order.buyer)}
        </Heading>
        <Heading variant="h6" color="emphasize">
          Order value: $ {order.orderPrice.toFixed(2)}
        </Heading>
      </Surface>
    </>
  );
}