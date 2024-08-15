export const getNetworkDisplayName = (network: string) => {
  if (network === 'mainnet01') return 'Mainnet';
  if (network === 'testnet04') return 'Testnet';
  if (network === 'development' || 'fast-development') return 'Devnet';
  return network;
};

export const getRootkeyPasskeyName = (network: string) => {
  const rootkeyPasskeyName = `SpireKey Wallet Manager`;
  return `${rootkeyPasskeyName} (${getNetworkDisplayName(network)})`;
};
