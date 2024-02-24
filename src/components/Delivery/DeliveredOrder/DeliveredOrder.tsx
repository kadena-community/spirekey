import { Order, useDelivery } from '@/app/v1/example/delivery/useDelivery';
import { useLoggedInAccount } from '@/app/v1/example/delivery/useLoggedInAccount';
import { Button } from '@/components/Button/Button';
import { Surface } from '@/components/Surface/Surface';
import { useReturnUrl } from '@/hooks/useReturnUrl';
import { getAccountFrom } from '@/utils/account';
import { Heading, Stack, SystemIcon, maskValue } from '@kadena/react-ui';
import { ChainId } from '@kadena/types';
import { useRouter } from 'next/navigation';

interface Props {
  order: Order;
}

export function DeliveredOrder({ order }: Props) {
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
      const merchantAcc = await getAccountFrom({
        caccount: merchant,
        networkId: process.env.DAPP_NETWORK_ID!,
      });
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
            alignItems="flex-start"
            marginBlockEnd="md"
          >
            <Heading variant="h5" color="emphasize">
              Delivery price: $ {order.deliveryPrice.toFixed(2)}
            </Heading>
            <SystemIcon.Check size="lg" />
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
