import type { Account } from '@/context/AccountsContext';
import { ChainId, createTransaction } from '@kadena/client';
import {
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from '@kadena/client/fp';
import { asyncPipe } from './asyncPipe';
import { l1Client } from './client';

export const getAccountFrom = async ({
  accountName,
  networkId,
  namespace = process.env.NAMESPACE,
}: {
  accountName: string;
  networkId: string;
  namespace?: string;
}): Promise<Account> =>
  asyncPipe(
    composePactCommand(
      execution(
        `[
          (${namespace}.webauthn-wallet.get-webauthn-guard "${accountName}")
          (coin.get-balance "${accountName}")
        ]`,
      ),
      setMeta({
        chainId: process.env.CHAIN_ID as ChainId,
      }),
      setNetworkId(networkId),
    ),
    createTransaction,
    (tx) => l1Client.local(tx, { preflight: false }),
    (tx) => {
      if (tx?.result?.status !== 'success') return null;
      const [devices, balance] = tx.result.data;
      return {
        accountName,
        devices: devices.devices || [],
        balance,
      };
    },
  )({});