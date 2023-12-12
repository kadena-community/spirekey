import { Account, Device } from "@/hooks/useAccounts";
import { asyncPipe } from "@/utils/asyncPipe";
import { createTransaction } from "@kadena/client";
import {
  addData,
  addSigner,
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from "@kadena/client/fp";

export const addDevice = async (
  signingDevice: Device,
  account: Account,
  device: Device
) => {
  const result = await asyncPipe(
    composePactCommand(
      execution(
        `(n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.webauthn-wallet.add-device
          "${account.account}" (read-msg 'device))`
      ),
      addData("device", device),
      setMeta({
        senderAccount: account.account,
        gasLimit: 4000,
        chainId: "14",
        gasPrice: 0.00000001,
      }),
      setNetworkId("fast-development"),
      addSigner(
        // @ts-expect-error WebAuthn is not yet added to the @kadena/client types
        {
          pubKey: signingDevice.guard.keys[0],
          scheme: "WebAuthn",
        },
        (withCap) => [
          withCap(
            "n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.webauthn-wallet.ADD_DEVICE",
            account.account
          ),
          withCap(
            "n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.webauthn-wallet.GAS_PAYER",
            account.account,
            { int: 1 },
            1
          ),
          withCap("coin.GAS"),
        ]
      )
    ),
    createTransaction
  )({});

  return result;
};
