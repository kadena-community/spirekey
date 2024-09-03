import {
  getRAccountName,
  getWebAuthnPubkeyFormat,
  registerRAccounts,
} from '@/utils/register';
import { getNewWebauthnKey } from '@/utils/webauthnKey';
import { type ApolloClient, gql, useMutation } from '@apollo/client';
import { Account } from '@kadena/spirekey-types';
import { ChainId } from '@kadena/types';

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
  networkId: string;
};
type ApolloContext = {
  client: ApolloClient<any>;
};
export const accounts = async (
  _: any,
  { networkId }: AccountsVariable,
  { client }: ApolloContext,
) => {
  const accs = localAccounts(networkId);
  const resolvedAccs = await Promise.all(
    accs.map(async (acc) => {
      const res = await client.query({
        query: getAccountQuery,
        variables: {
          code: `(kadena.spirekey.details "${acc.accountName}" coin)`,
          networkId,
        },
      });
      return Object.values(res.data)
        .flatMap((r) => r)
        .map((r: any) => ({ ...JSON.parse(r.result), txQueue: acc.txQueue }));
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
          networkId,
          txQueue: [],
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

type CreateAccountVariables = {
  networkId: string;
  publicKey: string;
  secretKey: string;
  alias: string;
  domain: string;
  color: string;
};
export const createAccount = async (
  _: any,
  {
    networkId,
    publicKey,
    secretKey,
    alias,
    color,
    domain,
  }: CreateAccountVariables,
  { client }: ApolloContext,
) => {
  const {
    publicKey: credentialPubkey,
    deviceType,
    credentialId,
  } = await getNewWebauthnKey(alias);
  const account = {
    networkId,
    credentialId,
    deviceType,
    alias,
    color,
    domain,
    credentialPubkey: publicKey,
  };
  const { name: accountName, guard } = await getRAccountName(
    credentialPubkey,
    publicKey,
    networkId,
  );
  const pendingTxs = await registerRAccounts({
    ...account,
    accountName,
    publicKey,
    secretKey,
  });
  return {
    accountName,
    guard,
    networkId,
    balance: '0.0',
    alias,
    chainIds: Array(20)
      .fill(1)
      .map((_, i) => i.toString()) as ChainId[],
    minApprovals: 1,
    minRegistrationApprovals: 1,
    devices: [
      {
        color,
        deviceType,
        domain,
        guard: {
          keys: [getWebAuthnPubkeyFormat(publicKey)],
          pred: 'keys-any',
        },
        'credential-id': credentialId,
      },
    ],
    txQueue: pendingTxs,
  };
};
const createAccountMutation = gql`
  mutation CreateAccount(
    $networkId: String
    $publicKey: String
    $secretKey: String
    $alias: String
    $domain: String
    $color: String
  ) {
    createAccount(
      networkId: $networkId
      publicKey: $publicKey
      secretKey: $secretKey
      alias: $alias
      domain: $domain
      color: $color
    ) @client
  }
`;
export const useCreateAccount = () => {
  const [mutate] = useMutation(createAccountMutation);
  const createAccount = async (variables: CreateAccountVariables) => {
    const { data } = await mutate({ variables });
    if (!data?.createAccount) throw new Error('Account creation failed');
    return data.createAccount;
  };
  return {
    createAccount,
  };
};
