'use client';

import { getAccountFrom } from '@/utils/account';
import { l1Client } from '@/utils/client';
import { getWebAuthnPubkeyFormat, registerAccountOnChain } from '@/utils/register';
import { ITransactionDescriptor } from '@kadena/client';
import { createContext, useContext, useEffect } from 'react';
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
  pendingRegistrationTx?: string;
};

export type AccountRegistration = {
  caccount: string;
  alias: string;
  color: string;
  deviceType: string;
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
  const rawLocalAccounts = localStorage.getItem('localAccounts');
  if (!rawLocalAccounts) return;

  const localAccounts: LocalAccount[] = Object.values(
    JSON.parse(rawLocalAccounts),
  );

  return await Promise.all(
    localAccounts.map(async ({ alias, accountName, network, devices = [] }) => {
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

      const uniqueDevices = Array.from(
        [...account.devices, ...devices]
          .reduce(
            (allUniqueDevices, d) =>
              allUniqueDevices.set(d['credential-id'], d),
            new Map(),
          )
          .values(),
      );

      return {
        ...account,
        accountName,
        network,
        alias,
        devices: uniqueDevices.map((device: Device) => {
          const deviceOnChain = account.devices.find(
            (d) => d['credential-id'] === device['credential-id'],
          );

          return { ...deviceOnChain, ...device };
        }),
      };
    }),
  );
};

const registerAccount = async ({
  caccount,
  alias,
  color,
  deviceType,
  domain,
  credentialId,
  credentialPubkey,
  network,
}: AccountRegistration): Promise<ITransactionDescriptor> => {
  const { requestKey, chainId, networkId } = await registerAccountOnChain({
    caccount,
    color,
    deviceType,
    domain,
    credentialId,
    credentialPubkey,
    network,
  });

  const devices: Device[] = [
    {
      domain,
      color,
      deviceType,
      'credential-id': credentialId,
      guard: {
        keys: [getWebAuthnPubkeyFormat(credentialPubkey)],
        pred: 'keys-any',
      },
      pendingRegistrationTx: requestKey,
    },
  ];

  storeAccount({
    accountName: caccount,
    alias,
    network,
    devices,
  });

  return {
    requestKey,
    chainId,
    networkId,
  };
};

const storeAccount = ({
  accountName,
  network,
  alias,
  devices,
}: LocalAccount) => {
  const rawLocalAccounts = localStorage.getItem('localAccounts');
  if (!rawLocalAccounts)
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

  const localAccounts = JSON.parse(rawLocalAccounts);
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
  const { data: accounts } = useSWR('accounts', () => {
    return getAllAccounts();
  });

  useEffect(() => {
    if (!accounts) return;

    const checkPendingTxs = async () => {
      for (const account of accounts) {
        for (const device of account.devices) {
          if (device.pendingRegistrationTx) {
            const result = await l1Client.listen({
              requestKey: device.pendingRegistrationTx,
              chainId: '14',
              networkId: account.network,
            });

            if (result.result.status === 'success') {
              delete device.pendingRegistrationTx;
              storeAccount(account);
            }
          }
        }
      }
    };

    checkPendingTxs();
  }, [accounts]);

  return (
    <AccountsContext.Provider
      value={{
        accounts: (accounts as Account[]) || [],
        networks,
        storeAccount,
        registerAccount: async (accountRegistration: AccountRegistration) => {
          const tx = await registerAccount(accountRegistration);
          mutate('accounts');
          await l1Client.listen(tx);
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
