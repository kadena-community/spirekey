import {
  Order,
  useDelivery,
} from '@/app/(examples)/v1/example/delivery/useDelivery';
import { useLoggedInAccount } from '@/app/(examples)/v1/example/delivery/useLoggedInAccount';
import { Button } from '@/components/shared/Button/Button';
import { Surface } from '@/components/Surface/Surface';
import { useReturnUrl } from '@/hooks/shared/useReturnUrl';
import { getAccountFromChain } from '@/utils/shared/account';
import { Heading, maskValue, Stack } from '@kadena/react-ui';
import { ChainId } from '@kadena/types';
import { useRouter } from 'next/navigation';

interface Props {
  order: Order;
}

export function ReadyForPickUp({ order }: Props) {
  const { account } = useLoggedInAccount();
  const router = useRouter();
  const { getReturnUrl } = useReturnUrl();
  const { pickupDelivery } = useDelivery({
    chainId: process.env.CHAIN_ID as ChainId,
    networkId: process.env.DAPP_NETWORK_ID!,
  });

  const onPickupDelivery =
    ({ merchant, orderId }: Pick<Order, 'merchant' | 'orderId'>) =>
    async () => {
      if (!account) return;
      const merchantAcc = await getAccountFromChain({
        accountName: merchant,
        networkId: process.env.DAPP_NETWORK_ID!,
      });
      if (!merchantAcc) throw new Error('Merchant account not found');
      const tx = await pickupDelivery({
        orderId,
        merchantPublicKey: merchantAcc?.devices[0].guard.keys[0],
        courierAccount: account.accountName,
        courierPublicKey: account.credentials[0].publicKey,
      });
      router.push(
        `${process.env.WALLET_URL}/sign?transaction=${Buffer.from(
          JSON.stringify(tx),
        ).toString('base64')}&returnUrl=${getReturnUrl(
          '/v1/example/delivery/courier',
        )}`,
      );
    };

  return (
    <>
      <Surface>
        <Stack flexDirection="column" marginBlockEnd="md">
          <Stack
            justifyContent="space-between"
            alignItems="center"
            marginBlockEnd="md"
          >
            <Heading variant="h5">
              Delivery price: $ {order.deliveryPrice.toFixed(2)}
            </Heading>
            <Button
              variant="primary"
              onPress={onPickupDelivery({
                orderId: order.orderId,
                merchant: order.merchant,
              })}
            >
              Pick up
            </Button>
          </Stack>
        </Stack>
        <Heading variant="h6">Merchant: {maskValue(order.merchant)}</Heading>
        <Heading variant="h6">Customer: {maskValue(order.buyer)}</Heading>
        <Heading variant="h6">
          Order value: $ {order.orderPrice.toFixed(2)}
        </Heading>
      </Surface>
    </>
  );
}
