import { createTransaction, Pact } from "@kadena/client";
import {
  addSigner,
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from "@kadena/client/fp";
import { asyncPipe } from "../../utils/asyncPipe";

export const createOrder = async ({
  price,
  name,
  account,
  signerPubKey,
}: {
  price: number;
  name: string;
  account: string;
  signerPubKey: string;
}) => {
  return asyncPipe(
    composePactCommand(
      execution(
        Pact.modules[
          "n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.webauthn"
        ].transfer(() => "coin", name, "cookie-shop", {
          decimal: price.toString(),
        })
      ),
      setMeta({
        chainId: "14",
        gasLimit: 1000,
        gasPrice: 0.0000001,
        ttl: 60000,
        senderAccount: account,
      }),
      setNetworkId("fast-development"),
      addSigner(
        {
          pubKey: signerPubKey,
          // @ts-expect-error WebAuthn is not yet added to the @kadena/client types
          scheme: "WebAuthn",
        },
        (withCap: any) => [
          withCap(
            "n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.webauthn.TRANSFER",
            name,
            "cookie-shop",
            price
          ),
          withCap(
            "n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.webauthn.GAS_PAYER",
            name,
            { int: 1 },
            1
          ),
          withCap("coin.GAS"),
        ]
      )
    ),
    createTransaction
  )({});
};
