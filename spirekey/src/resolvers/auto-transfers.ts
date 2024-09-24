import {
  getOptimalTransfers,
  getTransferTransaction,
} from '@/utils/auto-transfers';
import { ApolloContextValue, gql, useLazyQuery } from '@apollo/client';
import { ChainId } from '@kadena/types';
import { AccountBalance, accountBalancesQuery } from './account-balances';

const autoTransfersQuery = gql`
  query AutoTransfers(
    $networkId: String!
    $accountName: String!
    $fungibleRequests: [FungibleRequest!]!
  ) {
    autoTransfers(
      networkId: $networkId
      accountName: $accountName
      fungibleRequests: $fungibleRequests
    ) @client
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
  const { data: accountBalancesData } = await client.query({
    query: accountBalancesQuery,
    variables: {
      networkId,
      accountName,
    },
  });

  if (!accountBalancesData?.accountBalances)
    throw new Error('Account balances could not be retrieved');
  const accountBalances: AccountBalance[] = accountBalancesData.accountBalances;

  const txs = fungibleRequests
    .flatMap(({ amount, target }) => {
      const transfers = getOptimalTransfers(
        [...accountBalances],
        target,
        amount,
      );
      if (!transfers) return null;
      return transfers.map(getTransferTransaction(target));
    })
    .filter((tx) => tx !== null);
  return txs;
};
export const useAutoTransfers = () => {
  const [execute] = useLazyQuery(autoTransfersQuery);
  const getAutoTransfers = async (
    networkId: string,
    accountName: string,
    fungibleRequests?: FungibleRequest[],
  ) => {
    if (!fungibleRequests) return [];
    const { data, error } = await execute({
      variables: {
        networkId,
        accountName,
        fungibleRequests,
      },
    });
    return data?.autoTransfers;
  };
  return { getAutoTransfers };
};
