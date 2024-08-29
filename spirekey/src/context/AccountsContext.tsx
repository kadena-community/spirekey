'use client';

import type { ChainId, ITransactionDescriptor } from '@kadena/client';
import type { Account, QueuedTx } from '@kadena/spirekey-types';
import { createContext, useContext, useEffect, useState } from 'react';

import { useReturnUrl } from '@/hooks/shared/useReturnUrl';
import { useTxQueue } from '@/hooks/useTxQueue';
import { deviceColors } from '@/styles/shared/tokens.css';
import { getAccountFromChains } from '@/utils/shared/account';
import { l1Client } from '@/utils/shared/client';
import { getDevnetNetworkId } from '@/utils/shared/getDevnetNetworkId';

export type AccountRegistration = {
  accountName: string;
  alias: string;
  color: string;
  deviceType: string;
  domain: string;
  credentialId: string;
  credentialPubkey: string;
  networkId: string;
  chainId?: ChainId;
};

const migrateAccountStructure = (
  account: Omit<Account, 'network' | 'txQueue'> & {
    network?: string;
    txQueue?: QueuedTx[];
  },
): Account => ({
  ...account,
  devices: account.devices.map((d) => ({
    ...d,
    deviceType: d.name?.replace(/_.*/, '') || 'security-key',
    color: d.name?.replace(/.*_/, '') || deviceColors.orange,
  })),
  networkId: account.network || account.networkId,
  txQueue: account.txQueue || [],
  chainIds: account.chainIds?.length
    ? account.chainIds
    : [process.env.CHAIN_ID],
});

const getAccountsFromLocalStorage = (): Account[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  const rawLocalAccounts = localStorage.getItem('localAccounts') || '[]';

  try {
    const parsedAccounts = JSON.parse(rawLocalAccounts) as
      | Account[]
      | Record<string, Account>;
    const accounts = Array.isArray(parsedAccounts)
      ? parsedAccounts
      : Object.values(parsedAccounts);
    const migratedAccounts = accounts.map(migrateAccountStructure);
    localStorage.setItem('localAccounts', JSON.stringify(migratedAccounts));

    return migratedAccounts;
  } catch {
    return [];
  }
};

const defaultState = {
  networks: ['mainnet01', 'testnet04', getDevnetNetworkId()],
  accounts: getAccountsFromLocalStorage(),
  setAccount: (account: Account): void => undefined,
};

const networks = ['mainnet01', 'testnet04', getDevnetNetworkId()];

const AccountsContext = createContext(defaultState);

type Props = {
  children: React.ReactNode;
};

const AccountsProvider = ({ children }: Props) => {
  const { host } = useReturnUrl();

  const [accounts, setAccounts] = useState<Account[]>(
    getAccountsFromLocalStorage(),
  );

  useEffect(() => {
    const enrichAccountsWithChainData = async () => {
      const updatedAccounts = await fetchAccountsFromChain(accounts);
      setAccounts(updatedAccounts);
    };

    enrichAccountsWithChainData();
  }, []);

  // - sync the accounts to local storage every time the accounts data change
  // - check pending device registration transactions
  useEffect(() => {
    localStorage.setItem('localAccounts', JSON.stringify(accounts));

    const checkPendingTxs = async () => {
      for (const account of accounts) {
        for (const device of account.devices) {
          if (device.pendingRegistrationTxs?.length) {
            await Promise.race(
              device.pendingRegistrationTxs.map(pollForRegistrationTx),
            );
          }
        }
      }
    };

    checkPendingTxs();
  }, [
    accounts
      .map(
        (a) =>
          a.accountName +
          a.alias +
          a.networkId +
          a.balance +
          a.txQueue.map((tx) => tx.requestKey).join(','),
      )
      .join(','),
  ]);

  const onAccountsUpdated = (updatedAccounts: Account[]) =>
    setAccounts(updatedAccounts);
  useTxQueue(accounts, onAccountsUpdated);

  const fetchAccountsFromChain = async (localAccounts: Account[]) => {
    return Promise.all(
      localAccounts.map(async (localAccount) => {
        const { accountName, networkId, alias, devices, chainIds } =
          localAccount;
        try {
          const remoteAccount = await getAccountFromChains({
            networkId,
            accountName,
            chainIds,
          });

          if (
            !remoteAccount?.chainIds?.length ||
            !remoteAccount?.devices?.length
          ) {
            throw new Error('Account not found on chain');
          }

          return migrateAccountStructure({
            guard: remoteAccount.guard,
            accountName,
            networkId,
            alias,
            minApprovals: remoteAccount.minApprovals,
            minRegistrationApprovals: remoteAccount.minRegistrationApprovals,
            balance: remoteAccount.balance || '0',
            devices: remoteAccount.devices,
            chainIds: remoteAccount.chainIds,
            txQueue: localAccount.txQueue,
          });
        } catch (e: unknown) {
          // We've stored our local data on chain, so localAccount === remoteAccount
          return localAccount;
        }
      }),
    );
  };

  const setAccount = (account: Account): void => {
    if (accounts.every((a) => a.accountName !== account.accountName))
      return addAccount(account);
    const updatedAccounts = accounts.map((acc) => {
      if (account.accountName !== acc.accountName) return acc;
      if (account.networkId !== acc.networkId) return acc;
      return account;
    });
    setAccounts(updatedAccounts);
  };

  const addAccount = (account: Account): void => {
    if (
      accounts.some(
        (a) =>
          a.accountName === account.accountName &&
          a.networkId === account.networkId,
      )
    )
      return;
    setAccounts([account, ...accounts]);
  };

  const removePendingTransaction = (requestKey: string) => {
    setAccounts(
      accounts.map((account) => ({
        ...account,
        devices: account.devices.map((d) => ({
          ...d,
          pendingRegistrationTxs: d.pendingRegistrationTxs?.filter(
            (p) => p.requestKey !== requestKey,
          ),
        })),
      })),
    );
  };

  const pollForRegistrationTx = async (tx: ITransactionDescriptor) => {
    const result = await l1Client.pollOne(tx);
    if (result.result.status === 'success') {
      removePendingTransaction(tx.requestKey);
    }
  };

  return (
    <AccountsContext.Provider
      value={{
        accounts,
        networks,
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
