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

type LocalAccount = Pick<Account, 'alias' | 'network' | 'accountName'>;

const defaultState = {
  networks: ['mainnet01', 'testnet04', 'fast-development'],
  accounts: [] as Account[],
  storeAccount: (account: LocalAccount) => {},
};

const networks = ['mainnet01', 'testnet04', 'fast-development'];

export const AccountsContext = createContext(defaultState);

type Props = {
  children: React.ReactNode;
};

const getAllAccounts = async () => {
  const accounts = localStorage.getItem('localAccounts');
  if (!accounts) return;

  const parsedAccounts: LocalAccount[] = Object.values(JSON.parse(accounts));

  return await Promise.all(
    parsedAccounts.map(async ({ alias, accountName, network }) => {
      const account = await getAccountFrom({
        networkId: network,
        caccount: accountName,
      });
      return {
        ...account,
        accountName,
        network,
        alias,
        devices: account.devices.map((device: any) => ({
          ...device,
          color: device.name.split('_')[1],
          deviceType: device.name.split('_')[0],
        })),
      };
    }),
  );
};

const getLocalAccountInfo = (accountName: string, network: string) => {
  const accounts = localStorage.getItem('localAccounts');
  if (!accounts) return {};

  const localAccounts = JSON.parse(accounts);
  return (
    localAccounts[`${accountName}-${network}`] || {
      alias: accountName,
      network,
      accountName,
    }
  );
};

const storeAccount = ({
  accountName,
  network,
  alias,
}: Pick<Account, 'alias' | 'network' | 'accountName'>) => {
  const accounts = localStorage.getItem('localAccounts');
  if (!accounts)
    return localStorage.setItem(
      'localAccounts',
      JSON.stringify({
        [`${accountName}-${network}`]: {
          alias,
          accountName,
          network,
        },
      }),
    );
  const localAccounts = JSON.parse(accounts);
  return localStorage.setItem(
    'localAccounts',
    JSON.stringify({
      ...localAccounts,
      [`${accountName}-${network}`]: {
        alias,
        accountName,
        network,
      },
    }),
  );
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
      value={{ accounts: (data as Account[]) || [], networks, storeAccount }}
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
