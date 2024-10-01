import type { ChainId, ITransactionDescriptor } from '@kadena/client';

export type QueuedTx = ITransactionDescriptor;

export type OptimalTransactionsAccount = Pick<
  Account,
  'chainIds' | 'accountName' | 'networkId' | 'requestedFungibles'
>;
export type Account = {
  alias: string;
  accountName: string;
  minApprovals: number;
  minRegistrationApprovals: number;
  balance: string;
  devices: Device[];
  guard?: Guard;
  keyset?: Keyset;
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
  guard: Keyset;
  pendingRegistrationTxs?: ITransactionDescriptor[];
  name?: string;
};

export type Guard = RefKeyset | Keyset;
type RefKeyset = {
  keysetref: {
    ns: string;
    ksn: string;
  };
};
type Keyset = {
  keys: string[];
  pred: string;
};

export type RequestedFungible = {
  fungible: string;
  amount: number;
  target?: ChainId;
};
