import type { ITransactionDescriptor } from '@kadena/client';
import type { Account } from '@kadena/spirekey-types';

type Credential = {
  type: string;
  publicKey: string;
  id: string;
};

export type User = {
  alias: string;
  accountName: string;
  pendingTxIds: ITransactionDescriptor[];
  credentials: Credential[];
};

export const getUser = (account: Account): User => {
  const [device] = account.devices;
  return {
    alias: account.alias,
    accountName: account.accountName,
    pendingTxIds: device.pendingRegistrationTxs || [],
    credentials: [
      {
        type: 'WebAuthn',
        publicKey: device.guard.keys[0],
        id: device['credential-id'],
      },
    ],
  };
};
