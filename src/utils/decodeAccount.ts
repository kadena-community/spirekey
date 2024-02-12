import type { LoginAccount } from '@/components/AccountButton';

const getStoredAccount = () => {
  if (typeof window === 'undefined') return null;
  const storedAccount = window.localStorage.getItem('account') || 'null';
  return JSON.parse(storedAccount);
};

export const decodeAccount = (response: string): LoginAccount => {
  if (!response) return getStoredAccount();
  const account: LoginAccount = JSON.parse(
    Buffer.from(response, 'base64').toString(),
  );

  if (typeof window !== 'undefined') {
    // @ TODO move to a better place
    window.localStorage.setItem('account', JSON.stringify(account));
  }

  return account;
};
