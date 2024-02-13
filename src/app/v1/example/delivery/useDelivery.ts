import { asyncPipe } from '@/utils/asyncPipe';
import { l1Client } from '@/utils/client';
import { createTransaction } from '@kadena/client';
import {
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from '@kadena/client/fp';
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
