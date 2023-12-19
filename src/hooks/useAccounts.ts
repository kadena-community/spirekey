import { getAccount, getAccountFrom } from "@/utils/account";
import { IClient } from "@kadena/client";
import { startAuthentication } from "@simplewebauthn/browser";
import { useEffect, useState } from "react";

export type Account = {
  name: string;
  account: string;
  balance: string;
  devices: Device[];
};

export type Device = {
  name: string;
  domain: string;
  ["credential-id"]: string;
  guard: {
    keys: string[];
    pred: "keys-any";
  };
};

export const useAccounts = (client: IClient) => {
  const [account, setAccount] = useState<Account | null>(null);
  const [restore, setRestore] = useState<string>("");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [device, setDevice] = useState<Device | null>(null);
  useEffect(() => {
    const accounts = localStorage.getItem("accounts");
    if (!accounts) return;
    const accs = JSON.parse(accounts);
    Promise.all(
      accs.map(async (acc: string) => ({
        name: acc,
        account: await getAccount(client)(acc),
      }))
    )
      .then((accs) => {
        return accs
          .map(({ name, account }) => {
            return {
              name,
              account: account?.name,
              devices: account?.devices,
              balance: account?.balance,
            };
          })
          .filter((acc) => acc.account);
      })
      .then((accs) => {
        setAccounts(accs);
        setAccount(accs[0]);
        if (accs[0].devices.length > 0) setDevice(accs[0].devices[0]);
      });
  }, [restore]);

  const onRestore = async ({
    caccount,
    networkId,
    namespace,
  }: {
    caccount: string;
    networkId: string;
    namespace: string;
  }) => {
    if (!caccount) throw new Error("Please enter an account name");
    const account = await getAccountFrom({ caccount, networkId, namespace });
    if (!account) throw new Error("Account not found");
    const res = await startAuthentication({
      challenge: "somethingrandom",
      rpId: window.location.hostname,
      allowCredentials: account.devices.map(
        ({ ["credential-id"]: cid }: Device) => ({
          id: cid,
          type: "public-key",
        })
      ),
    });
    if (
      !account.devices.some(
        ({ ["credential-id"]: cid }: Device) => cid === res.id
      )
    )
      throw new Error("Please authenticate using one of your devices");
    const accs = JSON.parse(localStorage.getItem("accounts") || "[]");
    localStorage.setItem(
      "accounts",
      JSON.stringify(Array.from(new Set([...accs, caccount])))
    );
    setRestore(account);
  };
  return {
    account,
    accounts,
    device,
    setAccount,
    setDevice,
    onRestore,
  };
};
