import { accountName } from '@/resolvers/account-name';
import { account, accounts } from '@/resolvers/accounts';
import { connectWallet } from '@/resolvers/connect-wallet';
import { createAccount } from '@/resolvers/create-account';
import { createWallet } from '@/resolvers/create-wallet';
import { recoverAccount } from '@/resolvers/recover-account';
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
      account,
      accountName,
      connectWallet,
      recoverAccount,
    },
    Mutation: {
      createWallet,
      createAccount,
    },
  },
});
