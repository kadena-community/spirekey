import { ReactNode, createContext, useEffect, useState } from "react";

import { getAccount, getAccountFrom } from "@/utils/account";
import { IClient } from "@kadena/client";
import { startAuthentication } from "@simplewebauthn/browser";

export type Device = {
  name: string;
  domain: string;
  ["credential-id"]: string;
  guard: {
    keys: string[];
    pred: "keys-any";
  };
};

export type Account = {
  name: string;
  account: string;
  balance: string;
  devices: Device[];
};

interface AccountContext {
  activeAccount: Account | null;
  activeDevice: Device | null;
  accounts: Account[];
  handleAccountChange: (caccount: string) => void;
  handleDeviceChange: (cid: string) => void;
  handleRestoreAccount: ({
    caccount,
    networkId,
    namespace,
  }: {
    caccount: string;
    networkId: string;
    namespace: string;
  }) => Promise<void>;
}

export const AccountContext = createContext<AccountContext>(
  {} as AccountContext
);

interface Props {
  client: IClient;
  children: ReactNode;
}

export function AccountsProvider({ client, children }: Props) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [activeAccount, setActiveAccount] = useState<Account | null>(null);
  const [activeDevice, setActiveDevice] = useState<Device | null>(null);

  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = async () => {
    const storedAccounts = JSON.parse(localStorage.getItem("accounts") ?? "[]");
    if (!storedAccounts.length) return;

    Promise.all(
      storedAccounts.map(async (account: string) => ({
        name: account,
        account: await getAccount(client)(account),
      }))
    )
      .then((accounts) =>
        accounts
          .map(({ name, account }) => ({
            name,
            account: account?.name,
            devices: account?.devices,
            balance: account?.balance,
          }))
          .filter((acc) => acc.account)
      )
      .then((accounts) => {
        setAccounts(accounts);

        if (!activeAccount) {
          return;
        }

        setActiveAccount(accounts[0]);
        if (accounts[0].devices.length > 0) {
          setActiveDevice(accounts[0].devices[0]);
        }
      });
  };

  const handleAccountChange = (caccount: string) => {
    const account = accounts.find((acc) => acc.account === caccount);
    if (!account) return;

    setActiveAccount(account);
    setActiveDevice(account.devices[0]);
  };

  const handleDeviceChange = (cid: string) => {
    const device = activeAccount?.devices.find(
      (device) => device["credential-id"] === cid
    );
    if (!device) return;

    setActiveDevice(device);
  };

  const handleRestoreAccount = async ({
    caccount,
    networkId,
    namespace,
  }: {
    caccount: string;
    networkId: string;
    namespace: string;
  }): Promise<void> => {
    if (!caccount) throw new Error("Please enter an account name");

    const account = await getAccountFrom({ caccount, networkId, namespace });
    if (!account) throw new Error("Account not found");

    const response = await startAuthentication({
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
        ({ ["credential-id"]: cid }: Device) => cid === response.id
      )
    ) {
      throw new Error("Please authenticate using one of your devices");
    }

    const storedAccounts = JSON.parse(localStorage.getItem("accounts") || "[]");

    localStorage.setItem(
      "accounts",
      JSON.stringify(Array.from(new Set([...storedAccounts, caccount])))
    );

    getAccounts();
  };

  const value = {
    accounts,
    activeAccount,
    activeDevice,
    handleAccountChange,
    handleDeviceChange,
    handleRestoreAccount,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}
