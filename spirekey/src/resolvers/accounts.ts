import { type ApolloClient, gql, useQuery } from '@apollo/client';
import { Account } from '@kadena/spirekey-types';

const getAccountQuery = gql`
  query GetAccount($code: String!) {
    ${Array(20)
      .fill(1)
      .map(
        (_, i) => `
    chain${i}: pactQuery(pactQuery: { chainId: "${i}", code: $code }) {
      result
    }
   `,
      )}
  }
`;

type AccountsVariable = {
  networkIds: string[];
};
type ApolloContext = {
  client: ApolloClient<any>;
};
export const accounts = async (
  _: any,
  { networkIds }: AccountsVariable,
  { client }: ApolloContext,
) => {
  const accs = networkIds.flatMap((networkId) => localAccounts(networkId));
  const resolvedAccs = await Promise.all(
    accs.map(async (acc) => {
      const res = await client.query({
        query: getAccountQuery,
        variables: {
          code: `(kadena.spirekey.details "${acc.accountName}" coin)`,
          networkId: acc.networkId,
        },
      });
      return Object.values(res.data)
        .flatMap((r) => r)
        .map((r: any) => ({
          ...JSON.parse(r.result),
          txQueue: acc.txQueue,
          networkId: acc.networkId,
        }));
    }),
  );
  return resolvedAccs.map((r) =>
    r.reduce(
      (acc, info) => {
        const account: Account = {
          ...acc,
          accountName: info.account,
          guard: info.guard,
          minApprovals: 1,
          minRegistrationApprovals: 1,
          devices: info.devices,
          balance: acc.balance + info.balance,
          txQueue: [],
          networkId: info.networkId,
        };
        return account;
      },
      {
        __typename: 'Account',
        balance: 0,
        chainIds: Array(20)
          .fill(1)
          .map((_, i) => i.toString()),
      },
    ),
  );
};
const localAccounts = (networkId: string) => {
  const accString = localStorage.getItem('localAccounts');
  if (!accString) return [];
  const accs: Account[] = JSON.parse(accString);
  return accs.filter((a: Account) => a.networkId === networkId);
};
const getAccountsQuery = gql`
  query GetAccounts($networkId: String) {
    accounts(networkId: $networkId) @client
  }
`;
export const useAccounts = (
  networkIds: string[] = ['development', 'testnet04', 'mainnet01'],
) => {
  const { data, loading, error } = useQuery(getAccountsQuery, {
    variables: { networkIds },
  });
  return { accounts: data, isLoading: loading, error };
};
