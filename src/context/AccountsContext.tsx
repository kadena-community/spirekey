'use client';

import { getAccountFrom } from '@/utils/account';
import { registerAccountOnChain } from '@/utils/register';
import { createContext, useContext } from 'react';
import useSWR, { useSWRConfig } from 'swr';

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
  isRegistered: boolean;
};

export type AccountRegistration = {
  caccount: string;
  alias: string;
  displayName: string;
  domain: string;
  credentialId: string;
  credentialPubkey: string;
  network: string;
};

type LocalAccount = Pick<
  Account,
  'alias' | 'network' | 'accountName' | 'devices'
>;

const defaultState = {
  networks: ['mainnet01', 'testnet04', 'fast-development'],
  accounts: [] as Account[],
  storeAccount: (account: LocalAccount) => {},
  registerAccount: (data: AccountRegistration) => {},
  mutateAccounts: () => {},
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
    parsedAccounts.map(async ({ alias, accountName, network, devices }) => {
      const account = await getAccountFrom({
        networkId: network,
        caccount: accountName,
      });

      if (!account) {
        return {
          accountName,
          network,
          alias,
          devices,
        };
      }

      return {
        ...account,
        accountName,
        network,
        alias,
        devices: devices.map((device: Device) => {
          const deviceOnChain = account.devices.find(
            (d) => d['credential-id'] === device['credential-id'],
          );

          if (!deviceOnChain) {
            return device;
          }

          device.isRegistered = true;

          return device;
        }),
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

const registerAccount = async ({
  caccount,
  alias,
  displayName,
  domain,
  credentialId,
  credentialPubkey,
  network,
}: AccountRegistration): Promise<void> => {
  await registerAccountOnChain({
    caccount,
    displayName,
    domain,
    credentialId,
    credentialPubkey,
    network,
  });
  const accounts = localStorage.getItem('localAccounts');

  if (!accounts) {
    return;
  }

  const localAccounts = JSON.parse(accounts);
  const localAccount: Account = localAccounts[`${caccount}-${network}`];

  if (!localAccount) {
    return;
  }

  const devices: Device[] = localAccount.devices;
  const deviceIndex = devices.findIndex(
    (d) => d['credential-id'] === credentialId,
  );

  if (deviceIndex < 0) {
    return;
  }

  devices[deviceIndex].isRegistered = true;

  storeAccount({
    accountName: caccount,
    alias,
    network,
    devices,
  });
};

const storeAccount = ({
  accountName,
  network,
  alias,
  devices,
}: LocalAccount) => {
  const accounts = localStorage.getItem('localAccounts');
  if (!accounts)
    return localStorage.setItem(
      'localAccounts',
      JSON.stringify({
        [`${accountName}-${network}`]: {
          alias,
          accountName,
          network,
          devices,
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
        devices,
      },
    }),
  );
};

const AccountsProvider = ({ children }: Props) => {
  const { mutate } = useSWRConfig();
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
      value={{
        accounts: (data as Account[]) || [],
        networks,
        storeAccount,
        registerAccount: async (accountRegistration: AccountRegistration) => {
          await registerAccount(accountRegistration);
          mutate('accounts');
        },
        mutateAccounts: () => mutate('accounts'),
      }}
    >
      {children}
    </AccountsContext.Provider>
  );
};

const useAccounts = () => {
  const context = useContext(AccountsContext);
  if (context === undefined) {
    throw new Error('useAccounts must be used within a AccountsProvider');
  }
  return context;
};

export { AccountsProvider, useAccounts };
