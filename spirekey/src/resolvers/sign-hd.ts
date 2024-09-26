import { signWithKeyPair } from '@/utils/signSubmitListen';
import { ApolloClient, gql, useLazyQuery, useMutation } from '@apollo/client';
import { IUnsignedCommand } from '@kadena/types';
import { connectWalletQuery } from './connect-wallet';

type SignHdVariable = {
  networkId: string;
  txs: IUnsignedCommand[];
};

type ApolloContext = {
  client: ApolloClient<any>;
};

const signHdMutationQuery = gql`
  mutation signMutationQuery($networkId: String!, $txs: [Transaction!]!) {
    signHd(networkId: $networkId, txs: $txs) @client
  }
`;

export const signHd = async (
  _: any,
  { networkId, txs }: SignHdVariable,
  { client }: ApolloContext,
) => {
  const { data, error } = await client.query({
    query: connectWalletQuery,
    variables: { networkId },
  });
  if (error) throw error;
  if (!data?.connectWallet) throw new Error('No wallet connected');
  const { publicKey, secretKey } = data.connectWallet;
  const signWithHd = signWithKeyPair({ publicKey, secretKey });
  return txs.map(signWithHd);
};

export const useSignHd = () => {
  const [mutate] = useMutation(signHdMutationQuery);
  const signHd = async (networkId: string, txs: IUnsignedCommand[]) => {
    const { data, error } = await mutate({
      variables: {
        networkId,
        txs,
      },
    });
    if (error) throw error;
    if (!data?.signHd) throw new Error('Could not sign transactions');
    return data.signHd;
  };
  return { signHd };
};
