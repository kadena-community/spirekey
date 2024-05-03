'use client';

import { assertFulfilled } from '@/utils/assertFulfilled';
import { fundAccount } from '@/utils/fund';
import {
  getAccountName,
  getWebAuthnPubkeyFormat,
  registerAccountOnChain,
} from '@/utils/register';
import { getAccountFrom } from '@/utils/shared/account';
import { l1Client } from '@/utils/shared/client';
import { getDevnetNetworkId } from '@/utils/shared/getDevnetNetworkId';
import { ChainId, ITransactionDescriptor } from '@kadena/client';
import { createContext, useContext, useEffect, useState } from 'react';

export type Account = {
  alias: string;
  accountName: string;
  minApprovals: number;
  minRegistrationApprovals: number;
  balance: string;
  devices: Device[];
  networkId: string;
  chainIds: ChainId[];
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
  pendingRegistrationTxs: ITransactionDescriptor[];
  name?: string;
};

export type AccountRegistration = {
  alias: string;
  color: string;
  deviceType: string;
  domain: string;
  credentialId: string;
  credentialPubkey: string;
  networkId: string;
  chainIds: ChainId[];
};

export type AccountRecovery = Omit<AccountRegistration, 'accountName'>;

const migrateAccountNetworkToNetworkId = (
  account: Account & { network?: string },
): Account => {
  const migratedAccount = {
    ...account,
    networkId: account.network || account.networkId,
  };
  delete migratedAccount.network;
  return migratedAccount;
};

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
    const migratedAccounts = accounts.map(migrateAccountNetworkToNetworkId);
    localStorage.setItem('localAccounts', JSON.stringify(migratedAccounts));

    return migratedAccounts;
  } catch {
    return [];
  }
};

const networks = ['mainnet01', 'testnet04', getDevnetNetworkId()];

const defaultState = {
  networks,
  accounts: getAccountsFromLocalStorage(),
  registerAccount: async (
    data: AccountRegistration,
  ): Promise<ITransactionDescriptor[] | undefined> => undefined,
  setAccount: (account: Account): void => undefined,
};

export const AccountsContext = createContext(defaultState);

type Props = {
  children: React.ReactNode;
};

const AccountsProvider = ({ children }: Props) => {
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
          if (device.pendingRegistrationTxs) {
            pollForRegistrationTxs(device.pendingRegistrationTxs, account);
          }
        }
      }
    };

    checkPendingTxs();
  }, [accounts]);

  const fetchAccountsFromChain = async (localAccounts: Account[]) => {
    const results = await Promise.allSettled(
      localAccounts.map(async (localAccount) => {
        const { accountName, networkId, alias, devices, chainIds } =
          localAccount;

        const remoteAccount = await getAccountFrom({
          networkId,
          accountName,
          chainIds,
        });

        if (remoteAccount === null) {
          // Account not found (yet?), return the account from localStorage
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
          networkId,
          alias,
          balance: remoteAccount.balance || '0',
          devices: uniqueDevices.map((device: Device) => {
            const deviceOnChain = remoteAccount.devices.find(
              (remoteDevice) =>
                device['credential-id'] === remoteDevice['credential-id'],
            );

            return { ...deviceOnChain, ...device };
          }),
          chainIds: remoteAccount.chainIds,
          minApprovals: remoteAccount.minApprovals,
          minRegistrationApprovals: remoteAccount.minRegistrationApprovals,
        };
      }),
    );

    return results.filter(assertFulfilled).map((result) => result.value);
  };

  const setAccount = (account: Account): void => {
    const updatedAccounts =
      accounts?.filter((a) => a.accountName !== account.accountName) || [];
    updatedAccounts.unshift(account);
    setAccounts(updatedAccounts);
  };

  const addAccount = (account: Account): void => {
    setAccounts((oldAccounts) => [account, ...oldAccounts]);
  };

  const registerAccount = async ({
    alias,
    color,
    deviceType,
    domain,
    credentialId,
    credentialPubkey,
    networkId,
    chainIds,
  }: AccountRegistration): Promise<ITransactionDescriptor[]> => {
    const registerAccountResults: PromiseSettledResult<{
      accountName: string;
      transactionDescriptor: ITransactionDescriptor;
    }>[] = await Promise.allSettled(
      chainIds.map(async (chainId: ChainId) => {
        const accountName = await getAccountName(
          credentialPubkey,
          networkId,
          chainId,
        );

        return {
          accountName,
          transactionDescriptor: await registerAccountOnChain({
            accountName,
            color,
            deviceType,
            domain,
            credentialId,
            credentialPubkey,
            networkId,
            chainId,
          }),
        };
      }),
    );

    const successfulRegisterAccountResults =
      registerAccountResults.filter(assertFulfilled);

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
        pendingRegistrationTxs: successfulRegisterAccountResults.map(
          (result) => {
            return result.value.transactionDescriptor;
          },
        ),
      },
    ];

    const account = {
      accountName: successfulRegisterAccountResults.map(
        (result) => result.value.accountName,
      )[0], // @TODO maybe handle this better? In theory all accountNames should be the same
      alias,
      networkId,
      devices,
      balance: '0',
      chainIds,
      minApprovals: 1,
      minRegistrationApprovals: 1,
    };

    addAccount(account);

    return successfulRegisterAccountResults.map(
      (result) => result.value.transactionDescriptor,
    );
  };

  const recoverAccount = async ({
    alias,
    color,
    deviceType,
    domain,
    credentialId,
    credentialPubkey,
    networkId,
    chainIds,
  }: AccountRecovery): Promise<ITransactionDescriptor[]> => {
    try {
      const transactionsResults = await registerAccount({
        alias,
        color,
        deviceType,
        domain,
        credentialId,
        credentialPubkey,
        networkId,
        chainIds,
      });

      return transactionsResults;
    } catch (error) {
      throw new Error(
        `Recovery failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  };

  const removePendingTransaction = (requestKey: string) => {
    const account = accounts.find((a) =>
      a.devices
        .map((d) => d.pendingRegistrationTxs)
        .some((pendingRegistrationTxs) =>
          pendingRegistrationTxs?.some((tx) => tx.requestKey === requestKey),
        ),
    );

    if (!account) {
      return;
    }

    for (let device of account.devices) {
      if (
        device.pendingRegistrationTxs?.some(
          (tx) => tx.requestKey === requestKey,
        )
      ) {
        device.pendingRegistrationTxs = device.pendingRegistrationTxs?.filter(
          (tx) => tx.requestKey !== requestKey,
        );
        break;
      }
    }

    setAccount(account);
  };

  const pollForRegistrationTxs = async (
    txs: ITransactionDescriptor[],
    account: Account,
  ) => {
    const results = await Promise.allSettled(
      txs.map(async (tx) => {
        const result = await l1Client.listen(tx);

        if (
          process.env.INSTA_FUND === 'true' &&
          tx.networkId === getDevnetNetworkId()
        ) {
          fundAccount(account); // fire and forget
        }

        return result;
      }),
    );

    results.forEach((result) => {
      if (
        result.status === 'fulfilled' &&
        result.value.result.status === 'success'
      ) {
        removePendingTransaction(result.value.reqKey);
      }
    });
  };

  return (
    <AccountsContext.Provider
      value={{
        accounts,
        networks,
        registerAccount,
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
