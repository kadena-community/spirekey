import { getAccount } from "@/utils/account";
import { IClient } from "@kadena/client";
import { useCallback, useEffect, useState } from "react";

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
        return accs.map(({ name, account }) => {
          return {
            name,
            account: account.name,
            devices: account.devices,
            balance: account.balance,
          };
        });
      })
      .then((accs) => {
        setAccounts(accs);
        setAccount(accs[0]);
        if (accs[0].devices.length > 0) setDevice(accs[0].devices[0]);
      });
  }, [restore]);

  const onRestore = (account: string) => {
    const accs = JSON.parse(localStorage.getItem("accounts") || "[]");
    localStorage.setItem(
      "accounts",
      JSON.stringify(Array.from(new Set([...accs, account])))
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
