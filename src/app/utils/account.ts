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
          (n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.webauthn-wallet.get-webauthn-guard "${alias}")
          (coin.get-balance "${alias}")
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
      const [devices, balance] = tx.result.data;
      return {
        name: alias,
        devices: devices.devices,
        balance,
      };
    }
  )({});
