import { accounts } from '@/resolvers/accounts';
import { connectWallet, createWallet } from '@/resolvers/wallets';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const getGraphqlHost = (networkId: string) => {
  if (networkId === 'development') return 'http://localhost:8080/graphql';
  if (networkId === 'testnet04')
    return 'https://graph.testnet.kadena.network/graphql';
  return 'https://graph.kadena.network/graphql';
};
const cache = new InMemoryCache({});
const httpLink = new HttpLink({
  includeUnusedVariables: true,
  fetch: (_, opts) => {
    if (!opts?.body) return fetch(getGraphqlHost(''), opts);

    const { variables } = JSON.parse(opts.body.toString());
    return fetch(getGraphqlHost(variables.networkId), opts);
  },
});
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  resolvers: {
    Query: {
      accounts,
      connectWallet,
    },
    Mutation: {
      createWallet,
    },
  },
});
