import { createTransaction } from "@kadena/client";
import {
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from "@kadena/client/fp";
import { asyncPipe } from "./asyncPipe";
import { l1Client } from "./client";

export const getAccount = async (alias: string) =>
  asyncPipe(
    composePactCommand(
      execution(
        `[
          (n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.webauthn.get-account-name "${alias}")
          (read n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.webauthn.account-table "${alias}")
          (coin.get-balance (n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.webauthn.get-account-name "${alias}"))
        ]`
      ),
      setMeta({
        chainId: "14",
      }),
      setNetworkId("fast-development")
    ),
    createTransaction,
    (tx) => l1Client.local(tx, { preflight: false }),
    (tx) => {
      const [name, devices, balance] = tx.result.data;
      return {
        name,
        devices: devices.devices,
        balance,
      };
    }
  )({});
