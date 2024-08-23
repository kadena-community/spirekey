import { rootValue, schema } from '@/resolvers/local-resolvers';
import { executeExchange } from '@urql/exchange-execute';
import {
  AnyVariables,
  cacheExchange,
  Client,
  DocumentInput,
  Exchange,
  ExchangeInput,
  fetchExchange,
  makeResult,
  mapExchange,
  Operation,
  useQuery as useUrqlQuery,
} from 'urql';
import { filter, map, merge, pipe, tap } from 'wonka';

const getGraphqlHost = (networkId: string) => {
  if (networkId === 'development') return 'http://localhost:8080/graphql';
  if (networkId === 'testnet04')
    return 'https://graph.testnet.kadena.network/graphql';
  return 'https://graph.kadena.network/graphql';
};
export const query = async (
  networkId: string,
  query: DocumentInput,
  variables: AnyVariables,
) => {
  const url = getGraphqlHost(networkId);
  return await urqlClient.query(query, variables, {
    url,
  });
};
const localExchange = executeExchange({
  schema,
  rootValue,
  context: {
    query,
  },
});
const getFieldName = (op: Operation) =>
  op.query?.definitions?.some((d) =>
    d?.selectionSet?.selections?.some((s) => s.name?.value === 'accounts'),
  );
const customExchange: Exchange =
  ({ forward, ...rest }) =>
  (operations$) => {
    return pipe(
      operations$,
      tap((op) => {
        if (!getFieldName(op)) return localExchange({ forward, ...rest })(op);
        return forward(op);
      }),
    );
  };
export const urqlClient = new Client({
  // the default network to use when not set
  url: getGraphqlHost('testnet04'),
  exchanges: [cacheExchange, customExchange],
});

export const useQuery = (
  networkId: string,
  query: DocumentInput,
  variables: AnyVariables,
) => {
  const url = getGraphqlHost(networkId);
  return useUrqlQuery({
    query,
    variables,
    context: {
      url,
    },
  });
};
