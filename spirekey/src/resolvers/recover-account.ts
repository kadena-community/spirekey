import { ApolloContextValue, gql, useLazyQuery } from '@apollo/client';
import { startAuthentication } from '@simplewebauthn/browser';
import { useAccount, useAccounts } from './accounts';

type AccountNameVariable = {
  networkId: string;
  hdWalletKey: string;
  passKey: string;
};
const getAccountsByCidQuery = gql`
  query recover($filter: String) {
    events(
      qualifiedEventName: "kadena.spirekey.ADD_DEVICE"
      parametersFilter: $filter
      first: 1
    ) {
      totalCount
      edges {
        cursor
        node {
          chainId
          parameters
        }
      }
    }
  }
`;
export const recoverAccount = async (
  _: any,
  { networkId }: AccountNameVariable,
  { client }: ApolloContextValue,
) => {
  if (!client) throw new Error('No client provided');
  const { id } = await startAuthentication({
    challenge: 'recoverchallenge',
    rpId: location.hostname,
  });
  const { data } = await client.query({
    query: getAccountsByCidQuery,
    variables: {
      filter: `{\"array_contains\":[\"${id}\"]}`,
      networkId,
    },
  });
  const info = data?.events?.edges?.[0]?.node?.parameters;
  if (!info) throw new Error('No account found');
  const params: string[] = JSON.parse(info);
  const account = params.find((x) => x.startsWith('r:'));
  return account;
};
export const recoverAccountQuery = gql`
  query RecoverAccount($networkId: String!) {
    recoverAccount(networkId: $networkId) @client
  }
`;
export const useRecoverAccount = () => {
  const { getAccounts } = useAccounts();
  const { getAccount } = useAccount();
  const [getRecoveredAccount] = useLazyQuery(recoverAccountQuery);
  const recoverAccount = async (networkId: string) => {
    const { data } = await getRecoveredAccount({ variables: { networkId } });
    const account = await getAccount(networkId, data.recoverAccount);
    const accounts = await getAccounts([networkId]);
    const recoveredAccount = {
      ...account,
      alias: `SpireKey Account ${accounts.length + 1}`,
    };
    return recoveredAccount;
  };
  return {
    recoverAccount,
  };
};
