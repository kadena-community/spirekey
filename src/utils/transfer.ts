import { asyncPipe } from "@/utils/asyncPipe";
import { createTransaction } from "@kadena/client";
import {
  addSigner,
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from "@kadena/client/fp";

export const transfer = async ({
  amount,
  namespace,
  publicKey,
  receiver,
  sender,
  networkId,
}: {
  publicKey: string;
  sender: string;
  receiver: string;
  amount: number;
  namespace: string;
  networkId: string;
}): Promise<string> =>
  asyncPipe(
    composePactCommand(
      execution(
        `(${namespace}.webauthn-wallet.transfer "${sender}" "${receiver}" ${amount.toPrecision(
          8
        )})`
      ),
      setMeta({
        chainId: "14",
        gasLimit: 2000,
        gasPrice: 0.0000001,
        ttl: 60000,
        senderAccount: sender,
      }),
      setNetworkId(networkId),
      addSigner(
        // @ts-expect-error WebAuthn scheme is not yet added to kadena-client
        {
          pubKey: publicKey,
          scheme: "WebAuthn",
        },
        (signFor) => [
          signFor(
            `${namespace}.webauthn-wallet.TRANSFER`,
            sender,
            receiver,
            amount
          ),
          signFor(
            `${namespace}.webauthn-wallet.GAS_PAYER`,
            sender,
            { int: 1 },
            1
          ),
        ]
      )
    ),
    createTransaction
  )({});
