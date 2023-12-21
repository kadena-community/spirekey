import { ReactNode, createContext, useEffect, useState } from 'react';

import { usePubkeys } from '@/hooks/usePubkeys';
import { getAccountFrom } from '@/utils/account';
import { startAuthentication } from '@simplewebauthn/browser';
import { useNetwork } from './NetworkContext';

export type Device = {
  name: string;
  domain: string;
  ['credential-id']: string;
  guard: {
    keys: string[];
    pred: 'keys-any';
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
  storeAccount: (caccount: string) => Promise<void>;
  setActiveAccount: (caccount: string) => void;
  setActiveDevice: (cid: string) => void;
  getAccountDetails: () => Promise<void>;
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
  {} as AccountContext,
);

interface Props {
  children: ReactNode;
}

export function AccountsProvider({ children }: Props) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [activeAccount, setActiveAccount] = useState<Account | null>(null);
  const [activeDevice, setActiveDevice] = useState<Device | null>(null);
  const { addPubkey } = usePubkeys();
  const { network } = useNetwork();

  useEffect(() => {
    getAccountDetails();
  }, [network]);

  const getAccountDetailsFor = async (accounts: string[]) => {
    const accs = await Promise.all(
      accounts.map(async (account: string) => ({
        name: account,
        account: await getAccountFrom({
          caccount: account,
          networkId: network,
        }),
      })),
    );
    return accs
      .map(({ name, account }) => ({
        name,
        account: account?.name,
        devices: account?.devices,
        balance: account?.balance,
      }))
      .filter((acc) => acc.account);
  };

  const getAccountDetails = async () => {
    const storedAccounts = JSON.parse(localStorage.getItem('accounts') ?? '[]');
    if (!storedAccounts.length) return;

    const accounts = await getAccountDetailsFor(storedAccounts);
    setAccounts(accounts);

    if (accounts.length === 0) return;

    for (const account of accounts) {
      for (const device of account.devices) {
        addPubkey({
          cid: device['credential-id'],
          pubkey: device.guard.keys[0],
        });
      }
    }

    // if we have an active account, update it's data
    if (activeAccount) {
      const account = accounts.find(
        (acc) => acc.account === activeAccount.account,
      );
      setActiveAccount(account ?? accounts[0]);
      return;
    }

    setActiveAccount(accounts[0]);
    if (accounts[0].devices.length > 0) {
      setActiveDevice(accounts[0].devices[0]);
    }
  };

  const setAccount = (caccount: string) => {
    const account = accounts.find((acc) => acc.account === caccount);
    if (!account) return;

    setActiveAccount(account);
    setActiveDevice(account.devices[0]);
  };

  const setDevice = (cid: string) => {
    const device = activeAccount?.devices.find(
      (device) => device['credential-id'] === cid,
    );
    if (!device) return;

    setActiveDevice(device);
  };

  const storeAccount = async (caccount: string) => {
    const storedAccounts = JSON.parse(localStorage.getItem('accounts') || '[]');

    const newAccounts = Array.from(new Set([...storedAccounts, caccount]));
    localStorage.setItem('accounts', JSON.stringify(newAccounts));
    setAccounts(newAccounts);
    const details = await getAccountDetailsFor(newAccounts);
    const newAccount = details.find((acc) => acc.account === caccount);
    if (!newAccount) return;
    setActiveAccount(newAccount);
    if (!newAccount.devices.length) return;
    setActiveDevice(newAccount.devices[0]);
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
    if (!caccount) throw new Error('Please enter an account name');

    const account = await getAccountFrom({
      caccount,
      networkId: network,
      namespace,
    });
    if (!account) throw new Error('Account not found');

    const response = await startAuthentication({
      challenge: 'somethingrandom',
      rpId: window.location.hostname,
      allowCredentials: account.devices.map(
        ({ ['credential-id']: cid }: Device) => ({
          id: cid,
          type: 'public-key',
        }),
      ),
    });

    if (
      !account.devices.some(
        ({ ['credential-id']: cid }: Device) => cid === response.id,
      )
    ) {
      throw new Error('Please authenticate using one of your devices');
    }

    const storedAccounts = JSON.parse(localStorage.getItem('accounts') || '[]');

    localStorage.setItem(
      'accounts',
      JSON.stringify(Array.from(new Set([...storedAccounts, caccount]))),
    );

    getAccountDetails();
  };

  const value = {
    accounts,
    activeAccount,
    activeDevice,
    getAccountDetails,
    storeAccount,
    setActiveAccount: setAccount,
    setActiveDevice: setDevice,
    handleRestoreAccount,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}
