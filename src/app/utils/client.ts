import { createClient } from "@kadena/client";

export const l1Client = createClient(
  ({ chainId, networkId }) =>
    `${process.env.CHAINWEB_URL}/chainweb/0.0/${networkId}/chain/${chainId}/pact`
);
