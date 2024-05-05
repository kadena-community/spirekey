import type { Account, Device } from '@/context/AccountsContext';
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
 *
 */
export const getAccountFrom = async ({
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
      asyncPipe(
        composePactCommand(
          execution(
            `[
              (${namespace}.webauthn-wallet.get-webauthn-guard "${accountName}")
              (coin.get-balance "${accountName}")
            ]`,
          ),
          setMeta({
            chainId,
          }),
          setNetworkId(networkId),
        ),
        createTransaction,
        (tx) => l1Client.local(tx, { preflight: false }),
      )({}),
    ),
  );

  const successfulResults = results
    .filter(assertFulfilled)
    .filter((result) => result.value?.result?.status === 'success');

  console.log(JSON.stringify(successfulResults, null, 2));

  if (!successfulResults.length) return null;

  let totalBalance = 0;
  const devices: Device[] = [];
  const foundChainIds: ChainId[] = [];
  let minApprovals = 1;
  let minRegistrationApprovals = 1;

  successfulResults.forEach((result, index) => {
    const [accountResult, balanceResult] = result.value.result.data;
    totalBalance += parseFloat(balanceResult);

    // @TODO add unique devices to devices array

    foundChainIds.push(chainIds[index]);

    minApprovals = Math.max(minApprovals, accountResult['min-approvals'].int);
    minRegistrationApprovals = Math.max(
      minRegistrationApprovals,
      accountResult['min-registration-approvals'].int,
    );
  });

  return {
    accountName,
    networkId,
    chainIds: foundChainIds,
    balance: totalBalance.toString(),
    devices,
    minApprovals,
    minRegistrationApprovals,
  };
};
