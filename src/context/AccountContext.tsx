import { ReactNode, createContext, useEffect, useState } from "react";

import { getAccount } from "@/utils/account";
import { IClient } from "@kadena/client";

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
  handleAccountChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleDeviceChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleRestoreAccount: (account: string) => void;
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
        accounts.map(({ name, account }) => ({
          name,
          account: account.name,
          devices: account.devices,
          balance: account.balance,
        }))
      )
      .then((accounts) => {
        setAccounts(accounts);
        setActiveAccount(accounts[0]);
        if (accounts[0].devices.length > 0)
          setActiveAccount(accounts[0].devices[0]);
      });
  };

  const handleAccountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const account = accounts.find((acc) => acc.account === event.target.value);
    if (!account) return;

    setActiveAccount(account);
    setActiveDevice(account.devices[0]);
  };

  const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const device = activeAccount?.devices.find(
      (device) => device["credential-id"] === event.target.value
    );
    if (!device) return;

    setActiveDevice(device);
  };

  const handleRestoreAccount = (account: string) => {
    const storedAccounts = JSON.parse(localStorage.getItem("accounts") ?? "[]");

    localStorage.setItem(
      "accounts",
      JSON.stringify([...storedAccounts, account])
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
