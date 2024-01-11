'use client';

import { getAccountFrom } from '@/utils/account';
import { createContext, useContext, useEffect, useState } from 'react';

export type Account = {
  accountName: string;
  balance: string;
  devices: Device[];
  network: string;
};

export type Device = {
  identifier: string;
  domain: string;
  ['credential-id']: string;
  guard: {
    keys: string[];
    pred: 'keys-any';
  };
};

const defaultState = {
  networks: ['mainnet01', 'testnet04', 'fast-development'],
  accounts: [] as Account[],
};

const networks = ['mainnet01', 'testnet04', 'fast-development'];

export const AccountsContext = createContext(defaultState);

type Props = {
  children: React.ReactNode;
};

const AccountsProvider = ({ children }: Props) => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const getAccountsFromAllNetworks = async () => {
      const accounts = localStorage.getItem('accounts');
      if (!accounts) return;

      // ['c:one', 'c:two', 'c:three']
      const parsedAccounts = JSON.parse(accounts);

      const networkAccounts = await Promise.all(
        networks.map(async (network) => {
          const retrievedAccounts = await Promise.all(
            parsedAccounts.map((account: string) =>
              getAccountFrom({
                networkId: network,
                caccount: account,
              }),
            ),
          );

          return retrievedAccounts.filter(Boolean).map((account) => ({
            ...account,
            accountName: account.name,
            devices: account.devices.map((device: any) => ({
              ...device,
              identifier: device.name,
            })),
            network,
          }));
        }),
      );
      setAccounts(networkAccounts.flatMap((a) => a));
    };
    getAccountsFromAllNetworks();
  }, []);

  return (
    <AccountsContext.Provider value={{ accounts, networks }}>
      {children}
    </AccountsContext.Provider>
  );
};

const useAccounts = () => {
  const context = useContext(AccountsContext);
  if (context === undefined) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
};

export { AccountsProvider, useAccounts };
