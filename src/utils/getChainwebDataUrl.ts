export const getChainwebDataUrl = (network: string) => {
  switch (network) {
    case 'mainnet01':
      return 'https://estats.chainweb.com';
    case 'testnet04':
      return 'https://estats.testnet.chainweb.com';
    default:
      return process.env.CHAINWEB_URL || '';
  }
};
