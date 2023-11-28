import { createTransaction, IClient } from "@kadena/client";
import {
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from "@kadena/client/fp";
import { asyncPipe } from "./asyncPipe";

export const getAccount = (client: IClient) => async (alias: string) =>
  asyncPipe(
    composePactCommand(
      execution(
        `[
          (n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.webauthn-wallet.get-account-name "${alias}")
          (n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.webauthn-guard.get-account "${alias}")
          (coin.get-balance (n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.webauthn-wallet.get-account-name "${alias}"))
        ]`
      ),
      setMeta({
        chainId: "14",
      }),
      setNetworkId("fast-development")
    ),
    createTransaction,
    (tx) => client.local(tx, { preflight: false }),
    (tx) => {
      const [name, devices, balance] = tx.result.data;
      return {
        name,
        devices: devices.devices,
        balance,
      };
    }
  )({});
