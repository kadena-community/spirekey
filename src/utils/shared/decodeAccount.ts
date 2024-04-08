import type { ConnectAccount } from '@/app/(examples)/v1/example/delivery/components/AccountButton';

export const decodeAccount = (response: string): ConnectAccount | null => {
  if (!response) return null;

  const account: ConnectAccount = JSON.parse(
    Buffer.from(response, 'base64').toString(),
  );

  return account;
};
