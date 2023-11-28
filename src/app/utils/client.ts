import { createClient } from "@kadena/client";

export const l1Client = createClient(({ chainId, networkId }) => {
  if (networkId === "mainnet01")
    return `https://api.chainweb.com/chainweb/0.0/${networkId}/chain/${chainId}/pact`;
  if (networkId === "testnet04")
    return `https://api.testnet.chainweb.com/chainweb/0.0/${networkId}/chain/${chainId}/pact`;
  return `${process.env.CHAINWEB_URL}/chainweb/0.0/${networkId}/chain/${chainId}/pact`;
});
