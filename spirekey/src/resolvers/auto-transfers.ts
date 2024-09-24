import {
  getOptimalTransfers,
  getTransferTransaction,
} from '@/utils/auto-transfers';
import { signWithKeyPair } from '@/utils/signSubmitListen';
import { ApolloContextValue, gql } from '@apollo/client';
import { ChainId } from '@kadena/types';
import { AccountBalance, accountBalancesQuery } from './account-balances';
import { connectWalletQuery } from './connect-wallet';

const autoTransfersQuery = gql`
  query AutoTransfers($networkId: String!, $accountName: String!) {
    autoTransfers(networkId: $networkId, accountName: $accountName) @client
  }
`;
type FungibleRequest = {
  amount: number;
  fungible: string;
  target: ChainId;
};
export const autoTransfers = async (
  _: any,
  {
    networkId,
    accountName,
    fungibleRequests,
  }: {
    networkId: string;
    accountName: string;
    fungibleRequests: FungibleRequest[];
  },
  { client }: ApolloContextValue,
) => {
  if (!client) return [];
  const { data } = await client.query({
    query: connectWalletQuery,
    variables: {
      networkId,
    },
  });
  if (!data?.connectWallet) throw new Error('No credentials found');
  const { data: accountBalancesData, error } = await client.query({
    query: accountBalancesQuery,
    variables: {
      networkId,
      accountName,
    },
  });

  if (!accountBalancesData?.accountBalances)
    throw new Error('Account balances could not be retrieved');
  const { publicKey, secretKey } = data.connectWallet;
  const accountBalances: AccountBalance[] =
    accountBalancesData.accountBalances.map((a: AccountBalance) => ({
      ...a,
      credentials: [publicKey],
    }));

  const txs = fungibleRequests
    .flatMap(({ amount, target }) => {
      const transfers = getOptimalTransfers(accountBalances, target, amount);
      if (!transfers) return null;
      return transfers.map(getTransferTransaction(target));
    })
    .filter((tx) => tx !== null)
    .map(
      signWithKeyPair({
        publicKey,
        secretKey,
      }),
    );
  return txs;
};
