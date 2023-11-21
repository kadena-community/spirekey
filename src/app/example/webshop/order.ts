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
  caccount,
  waccount,
  signerPubKey,
}: {
  price: number;
  caccount: string;
  waccount: string;
  signerPubKey: string;
}) => {
  return asyncPipe(
    composePactCommand(
      execution(
        Pact.modules[
          "n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.webauthn-wallet"
        ].transfer(waccount, "cookie-shop", {
          decimal: price.toString(),
        })
      ),
      setMeta({
        chainId: "14",
        gasLimit: 1000,
        gasPrice: 0.0000001,
        ttl: 60000,
        senderAccount: caccount,
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
            "n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.webauthn-wallet.TRANSFER",
            waccount,
            "cookie-shop",
            price
          ),
          withCap(
            "n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.webauthn-wallet.GAS_PAYER",
            waccount,
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
