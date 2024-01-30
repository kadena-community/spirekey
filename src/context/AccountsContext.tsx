'use client';

import { getAccountFrom } from '@/utils/account';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

export type Account = {
  alias: string;
  accountName: string;
  balance: string;
  devices: Device[];
  network: string;
};

export type Device = {
  domain: string;
  color: string;
  deviceType: string;
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

const getAllAccounts = async () => {
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
          color: device.name.split('_')[1],
          deviceType: device.name.split('_')[0],
        })),
        network,
      }));
    }),
  );
  return networkAccounts.flatMap((a) => a) as Account[];
};

const getLocalAccountInfo = (accountName: string, network: string) => {
  const localItem = localStorage.getItem(`${accountName}-${network}`);
  if (!localItem) return {};
  return JSON.parse(localItem);
};

const AccountsProvider = ({ children }: Props) => {
  const { data } = useSWR('accounts', async () => {
    const allAccounts = await getAllAccounts();
    if (!allAccounts) return [];
    return allAccounts.map((account) => ({
      ...account,
      ...getLocalAccountInfo(account.accountName, account.network),
    }));
  });

  return (
    <AccountsContext.Provider
      value={{ accounts: (data as Account[]) || [], networks }}
    >
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
