import { ApolloContextValue, gql, useLazyQuery } from '@apollo/client';
import { ChainId } from '@kadena/types';
import { accountQuery } from './accounts';

export const accountBalancesQuery = gql`
  query AccountBalances($networkId: String!, $accountName: String!) {
    accountBalances(networkId: $networkId, accountName: $accountName) @client
  }
`;

export const accountBalances = async (
  _: any,
  { networkId, accountName }: { networkId: string; accountName: string },
  { client }: ApolloContextValue,
) => {
  if (!client) return null;
  const { data } = await client.query({
    query: accountQuery,
    variables: {
      networkId,
      accountName,
    },
  });
  if (!data?.account) return null;
  const account = data.account;
  return account.balances.map(
    ({
      chainId,
      balance,
    }: {
      chainId: ChainId;
      balance: string;
    }): AccountBalance => ({
      accountName: account.accountName,
      networkId: account.networkId,
      chainId,
      credentials: account.keyset.keys.filter(
        (k: string) => !k.startsWith('WEBAUTHN'),
      ),
      balance: parseFloat(balance),
      cost: 0,
    }),
  );
};
export type AccountBalance = {
  accountName: string;
  credentials: string[];
  balance: number;
  chainId: ChainId;
  networkId: string;
  cost: number;
};
export const useAccountBalances = () => {
  const [execute] = useLazyQuery(accountBalancesQuery);
  const getAccountBalances = async (networkId: string, accountName: string) => {
    const { data } = await execute({
      variables: {
        networkId,
        accountName,
      },
    });
    if (!data?.accountBalances) return null;
    return data.accountBalances as AccountBalance[];
  };
  return { getAccountBalances };
};
