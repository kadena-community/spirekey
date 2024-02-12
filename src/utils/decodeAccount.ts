import type { LoginAccount } from '@/components/AccountButton';

export const decodeAccount = (response: string): LoginAccount => {
  const account: LoginAccount = JSON.parse(
    Buffer.from(response, 'base64').toString(),
  );

  return account;
};
