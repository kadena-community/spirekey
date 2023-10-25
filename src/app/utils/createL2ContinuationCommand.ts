import { IContinuationPayloadObject } from "@kadena/client";
import {
  addKeyset,
  addSigner,
  composePactCommand,
  continuation,
  setMeta,
  setNetworkId,
} from "@kadena/client/fp";
import { genesisPubKey } from "../utils/constants";

export function createL2ContinuationCommand(
  options: IContinuationPayloadObject["cont"],
  signerPubKey: string
) {
  return composePactCommand(
    continuation(options),
    setMeta({
      chainId: "2",
      gasLimit: 1000,
      gasPrice: 0.0000001,
      ttl: 60000,
      senderAccount: "sender00",
    }),
    addSigner(genesisPubKey, (withCapabilities) => [
      withCapabilities("coin.GAS"),
      withCapabilities(
        "n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.l2.GOVERNANCE"
      ),
    ]),
    setNetworkId("fast-development")
  )();
}
