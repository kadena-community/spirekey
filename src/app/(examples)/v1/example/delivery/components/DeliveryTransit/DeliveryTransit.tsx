import {
  Order,
  useDelivery,
} from '@/app/(examples)/v1/example/delivery/useDelivery';
import { useLoggedInAccount } from '@/app/(examples)/v1/example/delivery/useLoggedInAccount';
import { Button } from '@/components/shared/Button/Button';
import { Surface } from '@/components/Surface/Surface';
import { useReturnUrl } from '@/hooks/shared/useReturnUrl';
import { getAccountFrom } from '@/utils/shared/account';
import { getTranslations } from '@/utils/shared/getTranslationBundle';
import { getSmartContractMeta } from '@/utils/shared/smartContractMeta';
import { Heading, maskValue, Stack } from '@kadena/react-ui';
import { ChainId } from '@kadena/types';
import { useRouter } from 'next/navigation';

interface Props {
  order: Order;
}

export function DeliveryTransit({ order }: Props) {
  const { account } = useLoggedInAccount();
  const router = useRouter();
  const { getReturnUrl } = useReturnUrl();
  const { deliverOrder } = useDelivery({
    chainId: process.env.CHAIN_ID as ChainId,
    networkId: process.env.DAPP_NETWORK_ID!,
  });

  const onDeliver =
    ({ buyer, orderId }: { buyer: string; orderId: string }) =>
    async () => {
      if (!account) return;
      const buyerAccount = await getAccountFrom({
        accountName: buyer,
        networkId: process.env.DAPP_NETWORK_ID!,
      });
      const tx = await deliverOrder({
        orderId,
        buyerAccount: buyer,
        buyerPublicKey: buyerAccount?.devices[0].guard.keys[0],
        courierPublicKey: account.credentials[0].publicKey,
      });
      router.push(
        `${process.env.WALLET_URL}/sign?transaction=${Buffer.from(
          JSON.stringify(tx),
        ).toString('base64')}&returnUrl=${getReturnUrl(
          '/v1/example/delivery/courier',
        )}&meta=${Buffer.from(JSON.stringify(getSmartContractMeta())).toString(
          'base64',
        )}&translations=${Buffer.from(
          JSON.stringify(getTranslations()),
        ).toString('base64')}`,
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
            <Heading variant="h5" color="emphasize">
              Delivery price: $ {order.deliveryPrice.toFixed(2)}
            </Heading>
            <Button
              variant="primary"
              onPress={onDeliver({
                orderId: order.orderId,
                buyer: order.buyer,
              })}
            >
              Deliver
            </Button>
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
