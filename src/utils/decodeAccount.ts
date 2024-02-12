import { Account } from '@/components/Account';

const getStoredAccount = () => {
  if (typeof window === 'undefined') return null;
  const storedAccount = window.localStorage.getItem('account') || 'null';
  return JSON.parse(storedAccount);
};

export const decodeAccount = (response: string) => {
  if (!response) return getStoredAccount();
  const account: Account = JSON.parse(
    Buffer.from(response, 'base64').toString(),
  );

  window.localStorage.setItem('account', JSON.stringify(account));

  return account;
};
