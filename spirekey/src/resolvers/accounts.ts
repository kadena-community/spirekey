import {
  type ApolloClient,
  gql,
  makeVar,
  useLazyQuery,
  useQuery,
  useReactiveVar,
} from '@apollo/client';
import { Account } from '@kadena/spirekey-types';

const accountsVar = makeVar<Account[]>([]);

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
  networkId?: string;
};
type ApolloContext = {
  client: ApolloClient<any>;
};
export const accounts = async (
  _: any,
  { networkId }: AccountsVariable,
  { client }: ApolloContext,
) => {
  const networkIds = networkId
    ? [networkId]
    : ['development', 'testnet04', 'mainnet01'];
  const accs = networkIds.flatMap((networkId) => localAccounts(networkId));
  const resolvedAccs = await Promise.all(
    accs.map(async (acc) => {
      const { data } = await client.query({
        query: accountQuery,
        variables: {
          accountName: acc.accountName,
          networkId: acc.networkId,
        },
      });
      return { ...acc, ...data.account };
    }),
  );
  accountsVar(resolvedAccs);
  return resolvedAccs;
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
export const account = async (
  _: any,
  {
    networkId,
    accountName,
    fungible = 'coin',
  }: { networkId: string; accountName: string; fungible?: string },
  { client }: ApolloContext,
) => {
  const res = await client.query({
    query: getAccountQuery,
    variables: {
      code: `(kadena.spirekey.details "${accountName}" ${fungible})`,
      networkId,
    },
  });
  return Object.values(res.data)
    .flatMap((r) => r)
    .map((r: any) => ({
      ...JSON.parse(r.result),
      txQueue: [],
      networkId,
    }))
    .reduce(
      (acc, info) => {
        const account: Account = {
          ...acc,
          accountName: info.account,
          guard: info.guard,
          minApprovals: 1,
          minRegistrationApprovals: 1,
          devices: info.devices.map((d: any) => ({
            ...d,
            deviceType: d['device-type'],
          })),
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
    );
};
const isDifferentAccountWith = (account: Account) => (acc: Account) =>
  acc.networkId !== account.networkId ||
  acc.accountName !== account.accountName;
const setAccount = (account: Account) => {
  const accounts: Account[] = JSON.parse(
    localStorage.getItem('localAccounts') || '[]',
  );
  const isDifferentAccount = isDifferentAccountWith(account);
  const newAccounts = accounts.every(isDifferentAccount)
    ? [...accounts, account]
    : accounts.map((acc) => {
        if (isDifferentAccount(acc)) return acc;
        return {
          ...acc,
          ...account,
        };
      });

  accountsVar(newAccounts);
  return localStorage.setItem('localAccounts', JSON.stringify(newAccounts));
};
const accountQuery = gql`
  query AccountQuery($accountName: String!, $networkId: String!) {
    account(accountName: $accountName, networkId: $networkId) @client
  }
`;
export const useAccount = () => {
  const [execute] = useLazyQuery(accountQuery);
  const getAccount = async (networkId: string, accountName: string) => {
    const { data } = await execute({ variables: { networkId, accountName } });
    return data.account;
  };
  return { getAccount, setAccount };
};
export const useAccounts = () => {
  const { refetch, loading } = useQuery(getAccountsQuery);
  const getAccounts = async (networkId?: string) => {
    const { data } = await refetch({ networkId });
    return data.accounts as Account[];
  };
  const accounts = useReactiveVar(accountsVar);
  return { getAccounts, accounts, loading };
};