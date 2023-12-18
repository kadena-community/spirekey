import { createTransaction, IClient } from "@kadena/client";
import {
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from "@kadena/client/fp";
import { asyncPipe } from "./asyncPipe";

export const getAccount = (client: IClient) => async (caccount: string) =>
  asyncPipe(
    composePactCommand(
      execution(
        `[
          (${process.env.NAMESPACE}.webauthn-wallet.get-webauthn-guard "${caccount}")
          (coin.get-balance "${caccount}")
        ]`
      ),
      setMeta({
        chainId: "14",
      }),
      setNetworkId(process.env.NETWORK_ID || "fast-development")
    ),
    createTransaction,
    (tx) => client.local(tx, { preflight: false }),
    (tx) => {
      if (tx?.result?.status !== "success") return null;
      const [devices, balance] = tx.result.data;
      return {
        name: caccount,
        devices: devices.devices,
        balance,
      };
    }
  )({});
