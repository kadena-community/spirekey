import {
  getRAccountName,
  getWebAuthnPubkeyFormat,
  registerRAccounts,
} from '@/utils/register';
import { getNewWebauthnKey } from '@/utils/webauthnKey';
import { ApolloContextValue, gql, useMutation } from '@apollo/client';
import { ChainId } from '@kadena/types';

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
  { client }: ApolloContextValue,
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
