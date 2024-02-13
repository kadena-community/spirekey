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
        `(map (n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.get-order) [${ids.join(' ')}])`,
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

const createOrder = async ({
  chainId,
  networkId,
  customerAccount,
  customerPublicKey,
  merchantAccount,
  merchantPublicKey,
  orderPrice,
  deliveryPrice,
}: {
  chainId: string;
  networkId: string;
  customerAccount: string;
  customerPublicKey: string;
  merchantAccount: string;
  merchantPublicKey: string;
  orderPrice: number;
  deliveryPrice: number;
}) =>
  asyncPipe(
    composePactCommand(
      execution(
        `(n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.create-order
          "${createOrderId({
            customer: 'customer',
            merchant: 'merchant',
            orderId: 'orderId',
          })}"
          "${merchantAccount}"
          (read-keyset 'm-ks)
          "${customerAccount}"
          (read-keyset 'c-ks)
          ${orderPrice.toFixed(12)}
          ${deliveryPrice.toFixed(12)}
         )`,
      ),
      setMeta({
        chainId,
        senderAccount: customerAccount,
      }),
      setNetworkId(networkId),
      addData('c-ks', {
        keys: [customerPublicKey],
        pred: 'keys-any',
      }),
      addData('m-ks', {
        keys: [merchantPublicKey],
        pred: 'keys-any',
      }),
      addSigner(customerPublicKey),
    ),
    createTransaction,
  )({});

export const useDelivery = ({
  chainId = '14',
  networkId,
}: {
  chainId?: string;
  networkId: string;
}) => {
  const { data } = useSWR('deliveries', async () => {
    const deliveryIds = JSON.parse(localStorage.getItem('deliveryIds') || '[]');
    const orders = await getDeliveriesByIds({
      ids: deliveryIds,
      chainId,
      networkId,
    });
    // get the delivery details from the chain
    return orders;
  });
  return { orders: data };
};
