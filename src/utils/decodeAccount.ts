import type { LoginAccount } from '@/components/AccountButton';

const getStoredAccount = () => {
  if (typeof window === 'undefined') return null;
  const storedAccount = window.localStorage.getItem('account') || 'null';
  return JSON.parse(storedAccount);
};

export const decodeAccount = (response: string) => {
  if (!response) return getStoredAccount();
  const account: LoginAccount = JSON.parse(
    Buffer.from(response, 'base64').toString(),
  );

  window.localStorage.setItem('account', JSON.stringify(account));

  return account;
};
