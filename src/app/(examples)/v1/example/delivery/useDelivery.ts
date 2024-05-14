import { OrderItems } from '@/app/(examples)/v1/example/delivery/context/OrderContext';
import { asyncPipe } from '@/utils/shared/asyncPipe';
import { l1Client } from '@/utils/shared/client';
import { generateCapabilityHash } from '@/utils/translation';
import { ChainId, createTransaction } from '@kadena/client';
import {
  addSigner,
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from '@kadena/client/fp';
import { hash } from '@kadena/cryptography-utils';
import useSWR from 'swr';

export type Order = {
  orderId: string;
  status: string;
  courier: string;
  merchant: string;
  buyer: string;
  orderPrice: number;
  deliveryPrice: number;
};

interface OrderLine {
  'line-id': string;
  price: string;
}

type ChainOrder = {
  ['order-id']: string;
  courier: string;
  order: {
    buyer: string;
    merchant: string;
    ['order-status']: string;
    ['order-price']: number;
    ['delivery-price']: number;
  };
};

const getDeliveryEscrowId = async ({
  chainId,
  networkId,
}: {
  chainId: ChainId;
  networkId: string;
}) =>
  asyncPipe(
    composePactCommand(
      execution(`${process.env.NAMESPACE}.delivery.ESCROW_ID`),
      setMeta({
        chainId,
      }),
      setNetworkId(networkId),
    ),
    createTransaction,
    (tx) => l1Client.local(tx, { preflight: false }),
    (tx) => {
      if (tx?.result?.status !== 'success') return null;
      return tx.result.data;
    },
  )({});

const getDeliveriesByIds = async ({
  ids,
  chainId,
  networkId,
}: {
  ids: string[];
  chainId: ChainId;
  networkId: string;
}) =>
  asyncPipe(
    composePactCommand(
      execution(
        `(map (lambda (x) (try 
          { 'order-id: x }
          (${process.env.NAMESPACE}.delivery.get-order x)
        )) [${ids.map((x) => `"${x}"`).join(' ')}])`,
      ),
      setMeta({
        chainId,
      }),
      setNetworkId(networkId),
    ),
    createTransaction,
    (tx) => l1Client.local(tx, { preflight: false }),
    (tx) => {
      if (tx?.result?.status !== 'success') return null;
      return tx.result.data.map((x: ChainOrder) => {
        if (!x.order) return x;
        return {
          orderId: x['order-id'],
          status: x.order['order-status'],
          courier: x.courier,
          merchant: x.order.merchant,
          buyer: x.order.buyer,
          orderPrice: x.order['order-price'],
          deliveryPrice: x.order['delivery-price'],
        };
      });
    },
  )({});

export const createOrderId = ({
  customer,
  merchant,
  orderId,
}: {
  customer: string;
  merchant: string;
  orderId: string;
}) => hash(`${customer}-${merchant}-${orderId}`);
type OrderDetails = {
  chainId: ChainId;
  networkId: string;
  customerAccount: string;
  customerPublicKey: string;
  merchantAccount: string;
  merchantPublicKey: string;
  orderPrice: number;
  deliveryPrice: number;
  orderId: string;
  orderItems: OrderItems;
};

type OrderLineDetails = {
  orderLineId: string;
  price: number;
  translations: {
    [key: string]: { title: string; value: string; image: string }; // TODO: Add type for translation
  };
};
export const getOrderDetails = ({
  orderId,
  orderItems,
}: {
  orderId: string;
  orderItems: OrderItems;
}): OrderLineDetails[] => {
  const orderLines = orderItems.map((product) => {
    const price = product.quantity * product.price;
    const translation = {
      title: `${product.name} (${product.quantity} x ${product.price})`,
      value: price.toFixed(12),
      image: product.image.src,
    };
    // TODO: Separate hash id from capability props
    const args = [orderId, { decimal: price.toFixed(12) }];
    const orderLineId = generateCapabilityHash({
      capabilityArgs: args,
      customTranslation: translation,
    });
    args.splice(1, 0, orderLineId);
    const purchaseTranslationKey = `n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.PURCHASE_ORDER_ITEM(${args.map((x) => JSON.stringify(x)).join(',')})`;
    const sellTranslationKey = `n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.SELL_ORDER_ITEM(${args.map((x) => JSON.stringify(x)).join(',')})`;
    return {
      orderLineId,
      price,
      translations: {
        [purchaseTranslationKey]: translation,
        [sellTranslationKey]: translation,
      },
    };
  });
  return orderLines;
};
const createOrder = async ({
  chainId,
  networkId,
  customerAccount,
  customerPublicKey,
  merchantAccount,
  merchantPublicKey,
  orderPrice,
  deliveryPrice,
  orderId,
  orderItems,
}: OrderDetails) => {
  const orderHash = createOrderId({
    customer: customerAccount,
    merchant: merchantAccount,
    orderId,
  });

  localStorage.setItem('newOrderId', orderHash);

  const orderLines = getOrderDetails({
    orderId: orderHash,
    orderItems,
  });

  const escrowId = await getDeliveryEscrowId({ chainId, networkId });
  return asyncPipe(
    composePactCommand(
      execution(
        `(${process.env.NAMESPACE}.delivery.create-order
          "${orderHash}"
          [${orderLines
            .map(
              (x) =>
                `{ 'line-id : "${
                  x.orderLineId
                }", 'price : ${x.price.toFixed(12)}}`,
            )
            .join(' ')}]
          "${merchantAccount}"
          (${process.env.NAMESPACE}.webauthn-wallet.get-wallet-guard "${merchantAccount}")
          "${customerAccount}"
          (${process.env.NAMESPACE}.webauthn-wallet.get-wallet-guard "${customerAccount}")
          ${orderPrice.toFixed(12)}
          ${deliveryPrice.toFixed(12)}
         )`,
      ),
      setMeta({
        chainId,
        senderAccount: customerAccount,
        gasLimit: 10000,
        gasPrice: 0.0000001,
        ttl: 60000,
      }),
      setNetworkId(networkId),
      addSigner(
        { pubKey: customerPublicKey, scheme: 'WebAuthn' },
        (withCap) => [
          ...orderLines.map((orderLine) => {
            return withCap(
              `${process.env.NAMESPACE}.delivery.PURCHASE_ORDER_ITEM`,
              orderHash,
              orderLine.orderLineId,
              { decimal: orderLine.price.toFixed(12) },
            );
          }),
          withCap(
            `${process.env.NAMESPACE}.webauthn-wallet.TRANSFER`,
            customerAccount,
            escrowId,
            { decimal: (orderPrice + deliveryPrice).toFixed(12) },
          ),
          withCap(
            `${process.env.NAMESPACE}.webauthn-wallet.GAS_PAYER`,
            customerAccount,
            { int: 1 },
            1,
          ),
        ],
      ),
      addSigner(
        { pubKey: merchantPublicKey, scheme: 'WebAuthn' },
        (withCap) => [
          ...orderLines.map((orderLine) => {
            return withCap(
              `${process.env.NAMESPACE}.delivery.SELL_ORDER_ITEM`,
              orderHash,
              orderLine.orderLineId,
              { decimal: orderLine.price.toFixed(12) },
            );
          }),
          withCap(
            `${process.env.NAMESPACE}.webauthn-wallet.TRANSFER`,
            merchantAccount,
            escrowId,
            { decimal: orderPrice.toFixed(12) },
          ),
        ],
      ),
    ),
    createTransaction,
  )({});
};

const markOrderAsReady = async ({
  chainId,
  networkId,
  orderId,
  merchantAccount,
  merchantPublicKey,
}: {
  chainId: ChainId;
  networkId: string;
  orderId: string;
  merchantAccount: string;
  merchantPublicKey: string;
}) => {
  return asyncPipe(
    composePactCommand(
      execution(
        `(${process.env.NAMESPACE}.delivery.set-order-ready-for-delivery "${orderId}")`,
      ),
      setMeta({
        chainId,
        senderAccount: merchantAccount,
      }),
      setNetworkId(networkId),
      addSigner(
        { pubKey: merchantPublicKey, scheme: 'WebAuthn' },
        (withCap) => [
          withCap(
            `${process.env.NAMESPACE}.delivery.SET_READY_FOR_DELIVERY`,
            orderId,
          ),
          withCap(
            `${process.env.NAMESPACE}.webauthn-wallet.GAS_PAYER`,
            merchantAccount,
            { int: 1 },
            1,
          ),
        ],
      ),
    ),
    createTransaction,
  )({});
};

const pickupDelivery = async ({
  chainId,
  networkId,
  orderId,
  courierAccount,
  courierPublicKey,
  merchantPublicKey,
}: {
  chainId: ChainId;
  networkId: string;
  orderId: string;
  courierAccount: string;
  courierPublicKey: string;
  merchantPublicKey: string;
}) => {
  const escrowId = await getDeliveryEscrowId({ chainId, networkId });
  const [order] = await getDeliveriesByIds({
    chainId,
    networkId,
    ids: [orderId],
  });
  return asyncPipe(
    composePactCommand(
      execution(
        `(${process.env.NAMESPACE}.delivery.pickup-delivery 
          "${orderId}"
          "${courierAccount}" 
          (${process.env.NAMESPACE}.webauthn-wallet.get-wallet-guard "${courierAccount}")
        )`,
      ),
      setMeta({
        chainId,
        senderAccount: courierAccount,
      }),
      setNetworkId(networkId),
      addSigner({ pubKey: courierPublicKey, scheme: 'WebAuthn' }, (withCap) => [
        withCap(`${process.env.NAMESPACE}.delivery.PICKUP_DELIVERY`, orderId),
        withCap(
          `${process.env.NAMESPACE}.webauthn-wallet.TRANSFER`,
          courierAccount,
          escrowId,
          { decimal: (order.orderPrice * 2).toFixed(12) },
        ),
        withCap(
          `${process.env.NAMESPACE}.webauthn-wallet.GAS_PAYER`,
          courierAccount,
          { int: 1 },
          1,
        ),
      ]),
      addSigner(
        { pubKey: merchantPublicKey, scheme: 'WebAuthn' },
        (withCap) => [
          withCap(
            `${process.env.NAMESPACE}.delivery.HANDOFF_DELIVERY`,
            orderId,
          ),
        ],
      ),
    ),
    createTransaction,
  )({});
};

const completeDelivery = async ({
  chainId,
  networkId,
  orderId,
  courierPublicKey,
  buyerAccount,
  buyerPublicKey,
}: {
  chainId: ChainId;
  networkId: string;
  orderId: string;
  courierPublicKey: string;
  buyerAccount: string;
  buyerPublicKey: string;
}) =>
  asyncPipe(
    composePactCommand(
      execution(
        `(${process.env.NAMESPACE}.delivery.deliver-order "${orderId}")`,
      ),
      setMeta({
        chainId,
        senderAccount: buyerAccount,
      }),
      setNetworkId(networkId),
      addSigner({ pubKey: buyerPublicKey, scheme: 'WebAuthn' }, (withCap) => [
        withCap(`${process.env.NAMESPACE}.delivery.RECEIVE_ORDER`, orderId),
        withCap(
          `${process.env.NAMESPACE}.webauthn-wallet.GAS_PAYER`,
          buyerAccount,
          { int: 1 },
          1,
        ),
      ]),
      addSigner({ pubKey: courierPublicKey, scheme: 'WebAuthn' }, (withCap) => [
        withCap(`${process.env.NAMESPACE}.delivery.DELIVER_ORDER`, orderId),
      ]),
    ),
    createTransaction,
  )({});

export const useDelivery = ({
  chainId = '14',
  networkId,
}: {
  chainId: ChainId;
  networkId: string;
}) => {
  const { data: deliveryIds, mutate } = useSWR<string[]>('deliveryIds', () => {
    return JSON.parse(localStorage.getItem('deliveryIds') || '[]');
  });
  const { data, mutate: updateOrders } = useSWR<Order[]>(
    () => (deliveryIds ? 'deliveries' : null),
    async () => {
      const deliveryIds = JSON.parse(
        localStorage.getItem('deliveryIds') || '[]',
      );
      const orders: Order[] = await getDeliveriesByIds({
        ids: deliveryIds,
        chainId,
        networkId,
      });
      return orders;
    },
  );
  const saveDelivery = (id: string, customTranslation: any) => {
    const deliveryIds = new Set<string>(
      JSON.parse(localStorage.getItem('deliveryIds') || '[]'),
    );
    deliveryIds.add(id);
    const newDeliveryIds = Array.from(deliveryIds).filter(Boolean);
    localStorage.setItem('deliveryIds', JSON.stringify(newDeliveryIds));
    if (customTranslation)
      localStorage.setItem(`delivery-${id}`, JSON.stringify(customTranslation));
    mutate(newDeliveryIds);
  };
  const onCreateOrder = (
    orderDetails: Omit<OrderDetails, 'chainId' | 'networkId'>,
  ) => createOrder({ chainId, networkId, ...orderDetails });
  const onMarkOrderAsReady = ({
    orderId,
    merchantAccount,
    merchantPublicKey,
  }: {
    orderId: string;
    merchantAccount: string;
    merchantPublicKey: string;
  }) =>
    markOrderAsReady({
      chainId,
      networkId,
      orderId,
      merchantAccount,
      merchantPublicKey,
    });
  const onPickupDelivery = ({
    orderId,
    courierAccount,
    courierPublicKey,
    merchantPublicKey,
  }: {
    orderId: string;
    courierAccount: string;
    courierPublicKey: string;
    merchantPublicKey: string;
  }) =>
    pickupDelivery({
      chainId,
      networkId,
      orderId,
      courierAccount,
      courierPublicKey,
      merchantPublicKey,
    });
  const onDeliverOrder = ({
    orderId,
    courierPublicKey,
    buyerAccount,
    buyerPublicKey,
  }: {
    orderId: string;
    courierPublicKey: string;
    buyerAccount: string;
    buyerPublicKey: string;
  }) =>
    completeDelivery({
      chainId,
      networkId,
      orderId,
      courierPublicKey,
      buyerAccount,
      buyerPublicKey,
    });
  return {
    orders: data,
    createOrder: onCreateOrder,
    markOrderAsReady: onMarkOrderAsReady,
    pickupDelivery: onPickupDelivery,
    deliverOrder: onDeliverOrder,
    saveDelivery,
    refreshOrders: mutate,
    updateOrders,
  };
};
