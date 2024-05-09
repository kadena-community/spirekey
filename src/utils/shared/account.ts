import type { Account } from '@/context/AccountsContext';
import { assertFulfilled } from '@/utils/assertFulfilled';
import { ChainId, createTransaction } from '@kadena/client';
import {
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from '@kadena/client/fp';
import { asyncPipe } from './asyncPipe';
import { l1Client } from './client';

/**
 * Fetches account details from chain.
 *
 * This function queries a signle chain for an account's details such as balance and devices
 * It returns the balance, the list of devices, and minApprovals and minRegistrationApprovals.
 *
 * @param {Object} params - The parameters for fetching account details.
 * @param {string} params.accountName - The name of the account to fetch.
 * @param {string} params.networkId - The network ID where to get the information from
 * @param {ChainId} params.chainId - The chain ID to fetch the account from.
 * @param {string} [params.namespace=process.env.NAMESPACE] - The namespace of the account, defaults to environment variable NAMESPACE.
 * @returns {Promise<Omit<Account, 'alias'> | null>} An object containing the account details without the alias, or null if the account is not found on any chain.
 */
export const getAccountFromChain = async ({
  accountName,
  networkId,
  namespace = process.env.NAMESPACE,
  chainId = process.env.CHAIN_ID as ChainId,
}: {
  accountName: string;
  networkId: string;
  namespace?: string;
  chainId?: ChainId;
}): Promise<Omit<Account, 'alias'> | null> =>
  asyncPipe(
    composePactCommand(
      execution(
        `[
          (${namespace}.webauthn-wallet.get-webauthn-guard "${accountName}")
          (coin.get-balance "${accountName}")
        ]`,
      ),
      setMeta({ chainId }),
      setNetworkId(networkId),
    ),
    createTransaction,
    (tx) => l1Client.local(tx, { preflight: false }),
    (tx) => {
      if (tx?.result?.status !== 'success') return null;
      const [account, balance] = tx.result.data;
      return {
        accountName,
        minApprovals: account['min-approvals'].int,
        minRegistrationApprovals: account['min-registration-approvals'].int,
        devices: account.devices || [],
        balance,
        chainIds: [chainId],
        networkId,
      };
    },
  )({});

/**
 * Fetches account details from all chains.
 *
 * This function queries multiple chains for an account's details such as balance and devices,
 * and aggregates the results. It returns the combined balance, the list of devices across all chains,
 * and the highest values of minApprovals and minRegistrationApprovals found.
 *
 * @param {Object} params - The parameters for fetching account details.
 * @param {string} params.accountName - The name of the account to fetch.
 * @param {string} params.networkId - The network ID where to get the information from
 * @param {ChainId[]} params.chainIds - An array of chain IDs to query for the account.
 * @param {string} [params.namespace=process.env.NAMESPACE] - The namespace of the account, defaults to environment variable NAMESPACE.
 * @returns {Promise<Omit<Account, 'alias'> | null>} An object containing the account details without the alias, or null if the account is not found on any chain.
 */
export const getAccountFromChains = async ({
  accountName,
  networkId,
  chainIds,
  namespace = process.env.NAMESPACE,
}: {
  accountName: string;
  networkId: string;
  chainIds: ChainId[];
  namespace?: string;
}): Promise<Omit<Account, 'alias'> | null> => {
  const results = await Promise.allSettled(
    chainIds.map((chainId) =>
      getAccountFromChain({
        accountName,
        networkId,
        namespace,
        chainId,
      }),
    ),
  );

  const accounts = results
    .filter(assertFulfilled)
    .filter((result) => assertFulfilled(result) && result.value !== null)
    .map((result) => result.value)
    .filter(Boolean) as Account[];

  return accounts.reduce<Omit<Account, 'alias'>>(
    (account, accountOnChain) => {
      const credentialIds = account.devices.map(
        (device) => device['credential-id'],
      );
      return {
        ...account,
        balance: (
          Number(parseFloat(account.balance).toPrecision(8)) +
          Number(parseFloat(accountOnChain.balance).toPrecision(8))
        ).toString(),
        chainIds: [...account.chainIds, ...accountOnChain.chainIds],
        devices: [
          ...account.devices,
          ...accountOnChain.devices.filter(
            (device) => !credentialIds.includes(device['credential-id']),
          ),
        ],
        minApprovals: Math.max(
          account.minApprovals,
          accountOnChain.minApprovals,
        ),
        minRegistrationApprovals: Math.max(
          account.minRegistrationApprovals,
          accountOnChain.minRegistrationApprovals,
        ),
      };
    },
    {
      accountName,
      networkId,
      chainIds: [],
      balance: '0.0',
      devices: [],
      minApprovals: 1,
      minRegistrationApprovals: 1,
    },
  );
};
