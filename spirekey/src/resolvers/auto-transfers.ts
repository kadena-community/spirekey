import { getOptimalTransfers } from '@/utils/auto-transfers';
import { ApolloContextValue, gql } from '@apollo/client';
import { ChainId } from '@kadena/types';
import { AccountBalance, accountBalancesQuery } from './account-balances';
import { connectWalletQuery } from './connect-wallet';

const autoTransfersQuery = gql`
  query AutoTransfers($networkId: String!, $accountName: String!) {
    autoTransfers(networkId: $networkId, accountName: $accountName) @client
  }
`;
type FungibleRequest = {
  amount: number;
  fungible: string;
  target: ChainId;
};
export const autoTransfers = async (
  _: any,
  {
    networkId,
    accountName,
    fungibleRequests,
  }: {
    networkId: string;
    accountName: string;
    fungibleRequests: FungibleRequest[];
  },
  { client }: ApolloContextValue,
) => {
  if (!client) return [];
  const { data } = await client.query({
    query: connectWalletQuery,
    variables: {
      networkId,
    },
  });
  console.warn('DEBUGPRINT[2]: auto-transfers.ts:31: data=', data);
  if (!data?.connectWallet) throw new Error('No credentials found');
  const { data: accountBalancesData, error } = await client.query({
    query: accountBalancesQuery,
    variables: {
      networkId,
      accountName,
    },
  });

  if (!accountBalancesData?.accountBalances)
    throw new Error('Account balances could not be retrieved');
  const accountBalances: AccountBalance[] = accountBalancesData.accountBalances;
  const { publicKey, secretKey } = data.connectWallet;

  console.warn(
    'DEBUGPRINT[1]: auto-transfers.ts:49: fungibleRequests=',
    fungibleRequests,
  );
  const res = fungibleRequests.flatMap(({ amount, target }) =>
    getOptimalTransfers([...accountBalances], target, amount),
  );
  console.warn('DEBUGPRINT[6]: auto-transfers.ts:56: res=', res);
  return res;
};
