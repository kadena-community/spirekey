import type { ChainId, ICommand, ITransactionDescriptor } from '@kadena/client';

export type SpireKeyAccount = Account & { txQueue: QueuedTx[] };

export type QueuedTx = {
  cmd: ICommand;
  tx: ITransactionDescriptor;
};

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
  pendingRegistrationTxs?: ITransactionDescriptor[];
  name?: string;
};
