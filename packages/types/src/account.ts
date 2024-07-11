import type { ChainId, ITransactionDescriptor } from '@kadena/client';

export type QueuedTx = ITransactionDescriptor;

export type Account = {
  alias: string;
  accountName: string;
  minApprovals: number;
  minRegistrationApprovals: number;
  balance: string;
  devices: Device[];
  networkId: string;
  chainIds: ChainId[];
  txQueue: QueuedTx[];
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
  pendingRegistrationTxs?: ITransactionDescriptor[];
  name?: string;
};