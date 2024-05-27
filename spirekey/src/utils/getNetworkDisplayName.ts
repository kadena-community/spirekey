export const getNetworkDisplayName = (network: string) => {
  if (network === 'mainnet01') return 'Mainnet';
  if (network === 'testnet04') return 'Testnet';
  if (network === 'development' || 'fast-development') return 'Devnet';
  return network;
};
