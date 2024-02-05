import type { Account } from '@/context/AccountContext';
import { createTransaction, IClient } from '@kadena/client';
import {
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from '@kadena/client/fp';
import { asyncPipe } from './asyncPipe';
import { l1Client } from './client';

export const getAccountFrom = async ({
  caccount,
  networkId,
  namespace = process.env.NAMESPACE,
}: {
  caccount: string;
  networkId: string;
  namespace?: string;
}): Promise<Account> =>
  asyncPipe(
    composePactCommand(
      execution(
        `[
          (${namespace}.webauthn-wallet.get-webauthn-guard "${caccount}")
          (coin.get-balance "${caccount}")
        ]`,
      ),
      setMeta({
        chainId: '14',
      }),
      setNetworkId(networkId),
    ),
    createTransaction,
    (tx) => l1Client.local(tx, { preflight: false }),
    (tx) => {
      if (tx?.result?.status !== 'success') return null;
      const [devices, balance] = tx.result.data;
      return {
        name: caccount,
        devices: devices.devices || [],
        balance,
      };
    },
  )({});
