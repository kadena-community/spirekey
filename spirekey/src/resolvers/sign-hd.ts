import { handleTxQueue } from '@/hooks/useTxQueue';
import { l1Client } from '@/utils/shared/client';
import { signWithKeyPair } from '@/utils/signSubmitListen';
import { ApolloContextValue, gql, useMutation } from '@apollo/client';
import { ICommand, IUnsignedCommand } from '@kadena/types';
import { connectWalletQuery } from './connect-wallet';

type SignHdVariable = {
  networkId: string;
  txs: IUnsignedCommand[];
};

const signHdMutationQuery = gql`
  mutation SignSubmitHdMutationQuery(
    $networkId: String!
    $txs: [Transaction!]!
  ) {
    signSubmitHd(networkId: $networkId, txs: $txs) @client
  }
`;

export const signSubmitHd = async (
  _: any,
  { networkId, txs }: SignHdVariable,
  { client }: ApolloContextValue,
) => {
  if (!client) throw new Error('No client available');
  const { data, error } = await client.query({
    query: connectWalletQuery,
    variables: { networkId },
  });
  if (error) throw error;
  if (!data?.connectWallet) throw new Error('No wallet connected');
  const { publicKey, secretKey } = data.connectWallet;
  const signWithHd = signWithKeyPair({ publicKey, secretKey });
  const signedTxs = txs.map(signWithHd);
  const results = await Promise.all(signedTxs.map((tx) => l1Client.local(tx)));
  if (results.some((r) => r.result.status !== 'success'))
    throw new Error('Could not sign transactions');
  return await Promise.all(
    signedTxs.map((tx) => l1Client.submit(tx as ICommand)),
  );
};

export const useSignSubmitHd = () => {
  const [mutate, { loading }] = useMutation(signHdMutationQuery);
  const signSubmitHd = async (
    networkId: string,
    txs: IUnsignedCommand[],
    autoTxs?: IUnsignedCommand[],
  ) => {
    if (autoTxs?.length)
      await handleTxQueue(await signSubmitTxs(networkId, autoTxs));
    return await signSubmitTxs(networkId, txs);
  };
  const signSubmitTxs = async (networkId: string, txs: IUnsignedCommand[]) => {
    const { data, errors } = await mutate({
      variables: {
        networkId,
        txs,
      },
    });
    if (errors) throw errors;
    if (!data?.signSubmitHd) throw new Error('Could not sign transactions');
    return data.signSubmitHd;
  };
  return { signSubmitHd, isSubmitting: loading };
};
