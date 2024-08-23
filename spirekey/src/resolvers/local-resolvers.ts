import { Account } from '@kadena/spirekey-types';
import { buildSchema } from 'graphql';
import { gql } from 'urql';

export const schema = buildSchema(`
  type Query {
    accounts(networkId: String!): [Account]
  }
  type Account {
    accountName: String!
    balance: String!
    guard: Guard!
  }
  type Guard {
    keysetref: KeysetRef
  }
  type KeysetRef {
    ksn: String!
    ns: String!
  }
`);

type Params = {
  networkId: string;
};
type RootContext = {
  query: any;
};
type RootResolver = (params: Params, context: RootContext) => any;
const getRAccount = gql`
  query PactQuery($code: String!) {
    pactQuery(pactQuery: { chainId: "0", code: $code }) {
      result
    }
  }
`;
const accounts: RootResolver = async ({ networkId }, { query }) => {
  const accs = localAccounts(networkId);
  const resolvedAccs = await Promise.all(
    accs.map(async (acc) => {
      const res = await query(networkId, getRAccount, {
        code: `(kadena.spirekey.details "${acc.accountName}" coin)`,
      });
      console.warn('DEBUGPRINT[8]: local-resolvers.ts:41: res=', res);

      return res;
    }),
  );
  console.warn(
    'DEBUGPRINT[7]: local-resolvers.ts:44: resolvedAccs=',
    resolvedAccs,
  );
  return resolvedAccs;
};
const localAccounts = (networkId: string) => {
  const accString = localStorage.getItem('localAccounts');
  if (!accString) return [];
  const accs = JSON.parse(accString);
  console.warn('DEBUGPRINT[2]: local-resolvers.ts:28: accs=', accs);
  return accs.filter((a: Account) => a.networkId === networkId);
};
export const rootValue = {
  accounts,
};
