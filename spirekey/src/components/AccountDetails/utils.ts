import type { Account } from '@kadena/spirekey-types';

// the graph explorer works with network names instead of the IDs
// so best we can do is to map the names of the known networks.
// we cant do this for devnet, because the developer can give any name to that.
export const mapNetworkIdToExplorerName = (
  networkId: Account['networkId'],
): string => {
  switch (networkId) {
    case 'mainnet01':
      return 'mainnet';
    case 'testnet04':
      return 'testnet';
    default:
      return networkId;
  }
};

export const createExplorerLink = (
  tx: any,
  networkId: Account['networkId'],
): string => {
  if (!tx?.requestKey) {
    return `https://explorer.kadena.io/${mapNetworkIdToExplorerName(networkId)}`;
  }

  return `https://explorer.kadena.io/${mapNetworkIdToExplorerName(networkId)}/transaction/${tx.requestKey}`;
};
