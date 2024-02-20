import { getDevnetNetworkId } from './getDevnetNetworkId';

export const getNetworkDisplayName = (network: string) => {
  if (network === 'mainnet01') return 'Mainnet';
  if (network === 'testnet04') return 'Testnet';
  if (network === getDevnetNetworkId()) return 'Devnet';
  return network;
};
