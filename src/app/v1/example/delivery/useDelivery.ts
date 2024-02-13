import { asyncPipe } from '@/utils/asyncPipe';
import { l1Client } from '@/utils/client';
import { createTransaction } from '@kadena/client';
import {
  addData,
  addSigner,
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from '@kadena/client/fp';
import { hash } from '@kadena/cryptography-utils';
import useSWR from 'swr';

const getDeliveriesByIds = async ({
  ids,
  chainId,
  networkId,
}: {
  ids: string[];
  chainId: string;
  networkId: string;
}) =>
  asyncPipe(
    composePactCommand(
      execution(
        `(map (n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.get-order) [${ids.map((x) => `"${x}"`).join(' ')}])`,
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
      return tx.result.data;
    },
  )({});

const createOrderId = ({
  customer,
  merchant,
  orderId,
}: {
  customer: string;
  merchant: string;
  orderId: string;
}) => hash(`${customer}-${merchant}-${orderId}`);
type OrderDetails = {
  chainId: string;
  networkId: string;
  customerAccount: string;
  customerPublicKey: string;
  merchantAccount: string;
  merchantPublicKey: string;
  orderPrice: number;
  deliveryPrice: number;
  orderId: string;
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
}: OrderDetails) => {
  const orderHash = createOrderId({
    customer: customerAccount,
    merchant: merchantAccount,
    orderId,
  });

  return asyncPipe(
    composePactCommand(
      execution(
        `(n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.create-order
          "${orderHash}"
          "${merchantAccount}"
          (n_eef68e581f767dd66c4d4c39ed922be944ede505.webauthn-wallet.get-wallet-guard "${merchantAccount}")
          "${customerAccount}"
          (n_eef68e581f767dd66c4d4c39ed922be944ede505.webauthn-wallet.get-wallet-guard "${customerAccount}")
          ${orderPrice.toFixed(12)}
          ${deliveryPrice.toFixed(12)}
         )`,
      ),
      setMeta({
        chainId,
        senderAccount: customerAccount,
      }),
      setNetworkId(networkId),
      addSigner(
        // @ts-expect-error WebAuthn scheme is not yet added to kadena-client
        { pubKey: customerPublicKey, scheme: 'WebAuthn' },
        (withCap) => [
          withCap(
            'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.CREATE_ORDER',
            orderHash,
          ),
          withCap(
            `n_eef68e581f767dd66c4d4c39ed922be944ede505.webauthn-wallet.GAS_PAYER`,
            customerAccount,
            { int: 1 },
            1,
          ),
        ],
      ),
      addSigner(
        // @ts-expect-error WebAuthn scheme is not yet added to kadena-client
        { pubKey: merchantPublicKey, scheme: 'WebAuthn' },
        (withCap) => [
          withCap(
            'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.CREATE_ORDER',
            orderHash,
          ),
        ],
      ),
    ),
    createTransaction,
  )({});
};

export const useDelivery = ({
  chainId = '14',
  networkId,
}: {
  chainId?: string;
  networkId: string;
}) => {
  const { data, mutate } = useSWR('deliveries', async () => {
    const deliveryIds = JSON.parse(localStorage.getItem('deliveryIds') || '[]');
    const orders = await getDeliveriesByIds({
      ids: deliveryIds,
      chainId,
      networkId,
    });
    return orders;
  });
  const saveDelivery = (id: string) => {
    const deliveryIds = new Set<string>(
      JSON.parse(localStorage.getItem('deliveryIds') || '[]'),
    );
    deliveryIds.add(id);
    localStorage.setItem(
      'deliveryIds',
      JSON.stringify(Array.from(deliveryIds)),
    );
    mutate('deliveries');
  };
  const onCreateOrder = (
    orderDetails: Omit<OrderDetails, 'chainId' | 'networkId'>,
  ) => createOrder({ chainId, networkId, ...orderDetails });
  return { orders: data, createOrder: onCreateOrder, saveDelivery };
};
