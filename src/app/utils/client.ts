import { createClient } from "@kadena/client";

export const l1Client = createClient(
  ({ chainId, networkId }) =>
    `http://localhost:8080/chainweb/0.0/${networkId}/chain/${chainId}/pact`
);
