'use client';

import { getAccountFrom } from '@/utils/account';
import { l1Client } from '@/utils/client';
import { getWebAuthnPubkeyFormat, registerAccountOnChain } from '@/utils/register';
import { ITransactionDescriptor } from '@kadena/client';
import { createContext, useContext, useEffect, useState } from 'react';

export type Account = {
  alias: string;
  accountName: string;
  balance?: string;
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

const defaultState = {
  networks: ['mainnet01', 'testnet04', 'fast-development'],
  accounts: null as (Account[] | null),
  registerAccount: async (data: AccountRegistration): Promise<ITransactionDescriptor | undefined> => undefined,
  listenForRegistrationTransaction: (tx: ITransactionDescriptor) => {},
  setAccount: (account: Account): void => undefined,
};

const networks = ['mainnet01', 'testnet04', 'fast-development'];

export const AccountsContext = createContext(defaultState);

type Props = {
  children: React.ReactNode;
};

const fetchAccountsFromChain = async (localAccounts: Account[]) => {
  return await Promise.all(
    localAccounts.map(async (localAccount) => {
      const {accountName, network, alias, devices, balance} = localAccount;
      let remoteAccount: Account;
      try {
        remoteAccount = await getAccountFrom({
          networkId: network,
          caccount: accountName,
        })
      } catch (e: unknown) {
        return localAccount;
      }

      if (!remoteAccount) {
        return localAccount;
      }

      const uniqueDevices = Array.from(
        [...remoteAccount.devices, ...devices]
          .reduce(
            (allUniqueDevices, d) =>
              allUniqueDevices.set(d['credential-id'], d),
            new Map(),
          )
          .values(),
      );

      return {
        accountName,
        network,
        alias,
        balance: remoteAccount.balance,
        devices: uniqueDevices.map((device: Device) => {
          const deviceOnChain = remoteAccount.devices.find(
            (d) => d['credential-id'] === device['credential-id'],
          );

          return { ...deviceOnChain, ...device };
        }),
      };
    })
  );
};

const fetchAccountsFromLocalStorage = () => {
  const rawLocalAccounts = localStorage !== undefined
    ? localStorage.getItem('localAccounts')
    : undefined;

  if (! rawLocalAccounts) {
    return [];
  }

  try {
    return Object.values(JSON.parse(rawLocalAccounts)) as Account[];
  } catch (e: unknown) {
    return [];
  }
};

const AccountsProvider = ({ children }: Props) => {
  const [ accounts, setAccounts ] = useState<null | Account[]>(null);

  useEffect(() => {
    const localAccounts = fetchAccountsFromLocalStorage();

    const enrichAccountsWithChainData = async () => {
      const updatedAccounts = await fetchAccountsFromChain(localAccounts);
      setAccounts(updatedAccounts);
    };

    enrichAccountsWithChainData();
  }, []);

  const setAccount = (account: Account): void => {
    const updatedAccounts = accounts?.filter(a => a.accountName !== account.accountName) || [];
    updatedAccounts.push(account);
    setAccounts(updatedAccounts);
  }

  const addAccount = (account: Account): void => {
    setAccounts([...(accounts || []), account]);
  }

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

    addAccount({
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

  const removePendingTransaction = (requestKey: string) => {
    const account = accounts?.find(a => a.devices.map(d => d.pendingRegistrationTx).includes(requestKey));

    if (! account) {
      return;
    }

    for (let device of account.devices) {
      if (device.pendingRegistrationTx === requestKey) {
        delete device.pendingRegistrationTx;
        break;
      }
    }

    setAccount(account);
  };

  const listenForRegistrationTransaction = async (tx: ITransactionDescriptor) => {
    const result = await l1Client.listen(tx);
    if (result.result.status === 'success') {
      removePendingTransaction(tx.requestKey);
    }
  };

  // - sync the accounts to local storage every time the accounts data change
  // - check pending device registration transactions
  useEffect(() => {
    if (! accounts) {
      return;
    }

    localStorage.setItem(
      'localAccounts',
      JSON.stringify(accounts.reduce((accounts, account: Account) => ({
        ...accounts,
        [`${account.accountName}-${account.network}`]: account,
      }), {}))
    );

    const checkPendingTxs = async () => {
      for (const account of accounts) {
        for (const device of account.devices) {
          if (device.pendingRegistrationTx) {
            listenForRegistrationTransaction({
              requestKey: device.pendingRegistrationTx,
              chainId: '14',
              networkId: account.network,
            });
          }
        }
      }
    };

    checkPendingTxs();
  }, [accounts]);

  return (
    <AccountsContext.Provider
      value={{
        accounts: (accounts as (null | Account[])),
        networks,
        registerAccount: async (accountRegistration: AccountRegistration): Promise<ITransactionDescriptor | undefined> => {
          try {
            return await registerAccount(accountRegistration);
          } catch (e: unknown) {
            return undefined;
          }
        },
        listenForRegistrationTransaction,
        setAccount,
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
