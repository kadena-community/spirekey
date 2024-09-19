import { ChainId, createClient } from '@kadena/client';
export const getChainwebUrl = ({
  chainId,
  networkId,
  host,
}: {
  chainId: ChainId;
  networkId: string;
  host?: string;
}) => {
  if (networkId === 'mainnet01')
    return `https://api.chainweb.com/chainweb/0.0/${networkId}/chain/${chainId}/pact`;
  if (networkId === 'testnet04')
    return `https://api.testnet.chainweb.com/chainweb/0.0/${networkId}/chain/${chainId}/pact`;
  if (networkId === 'l1')
    return `http://localhost:8080/chainweb/0.0/${networkId}/chain/${chainId}/pact`;
  if (networkId === 'l2')
    return `http://localhost:8081/chainweb/0.0/${networkId}/chain/${chainId}/pact`;
  return `${host || process.env.DEVNET_HOST || 'http://localhost:8080'}/chainweb/0.0/${networkId}/chain/${chainId}/pact`;
};

export const l1Client = createClient(
  getChainwebUrl,
  { confirmationDepth: 4 }, // TODO: Should we make this a variable?
);
