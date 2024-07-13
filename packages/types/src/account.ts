import type { ChainId, ITransactionDescriptor } from '@kadena/client';

export type QueuedTx = ITransactionDescriptor;

export type OptimalTransactionsAccount = Pick<
  Account,
  'chainIds' | 'accountName' | 'networkId' | 'requestedFungibles'
>;
export type RequestedFungible = {
  fungible: string;
  amount: number;
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
  txQueue: QueuedTx[];
  requestedFungibles?: RequestedFungible[];
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
