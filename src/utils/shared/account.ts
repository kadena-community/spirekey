import type { Account, Device } from '@/context/AccountsContext';
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
  chainIds,
  namespace = process.env.NAMESPACE,
}: {
  accountName: string;
  networkId: string;
  chainIds: ChainId[];
  namespace?: string;
}): Promise<Omit<Account, 'alias'>> => {
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

  let totalBalance = 0;
  const devices: Device[] = [];
  const foundChainIds: ChainId[] = [];
  let minApprovals = 1;
  let minRegistrationApprovals = 1;

  successfulResults.forEach((result, index) => {
    const [devicesResult, balanceResult] = result.value.data;
    devices.push(...(devicesResult.devices || []));
    totalBalance += parseFloat(balanceResult);

    foundChainIds.push(chainIds[index]);

    minApprovals =
      minApprovals > devicesResult['min-approvals'].int
        ? devicesResult['min-approvals'].int
        : minApprovals;
    minRegistrationApprovals =
      minRegistrationApprovals > devicesResult['min-registration-approvals'].int
        ? devicesResult['min-registration-approvals'].int
        : minRegistrationApprovals;
  });

  return {
    networkId,
    chainIds: foundChainIds,
    accountName,
    balance: totalBalance.toString(),
    devices,
    minApprovals,
    minRegistrationApprovals,
  };
};
