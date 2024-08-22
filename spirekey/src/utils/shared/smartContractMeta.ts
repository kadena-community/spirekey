import type { ICap } from '@kadena/client';
import type { Account } from '@kadena/spirekey-types';

export type CapabilityMeta = {
  name: string;
  argumentIndex?: number;
  hashValues?: number[];
  hashIndex?: number;
};
export interface Meta {
  name: string;
  module: string;
  description: string;
  hash: string;
  blessed: string[];
  capabilities: {
    granter: CapabilityMeta[];
    acceptor: CapabilityMeta[];
  };
}

const coinMeta: Meta = {
  name: 'Coin',
  module: 'coin',
  description: 'Coin smart contract that governs KDA token.',
  hash: 'M1gabakqkEi_1N8dRKt4z5lEv1kuC_nxLTnyDCuZIK0',
  blessed: [
    '1os_sLAUYvBzspn5jjawtRpJWiH1WPfhyNraeVvSIwU',
    'ut_J_ZNkoyaPUEJhiwVeWnkSQn9JT9sQCWKdjjVVrWo',
    'BjZW0T2ac6qE_I5X8GE4fal6tTqjhLTC7my0ytQSxLU',
  ],
  capabilities: {
    granter: [{ name: 'TRANSFER' }],
    acceptor: [],
  },
};

const deliveryMeta: Meta = {
  name: 'Delivery',
  module: `${process.env.NAMESPACE}.delivery`,
  description:
    'Delivery smart contract that governs ordering and delivery of products.',
  hash: 'hxK8VcEQFl2CkyXxKGwSz02_ccPUoYb24jElkBI_vCk',
  blessed: [],
  capabilities: {
    granter: [
      {
        name: 'PURCHASE_ORDER_ITEM',
        hashValues: [0, 1, 2],
        hashIndex: 1,
      },
      {
        name: 'SELL_ORDER_ITEM',
        hashValues: [0, 1, 2],
        hashIndex: 1,
      },
      {
        name: 'SET_READY_FOR_DELIVERY',
      },
      {
        name: 'PICKUP_DELIVERY',
      },
      {
        name: 'HANDOFF_DELIVERY',
      },
      {
        name: 'DELIVER_ORDER',
      },
      {
        name: 'RECEIVE_ORDER',
      },
    ],
    acceptor: [],
  },
};

const webauthnWalletMeta: Meta = {
  name: 'WebAuthn Wallet',
  module: `${process.env.NAMESPACE}.webauthn-wallet`,
  description: 'WebAuthnWallet smart contract that governs WebAuthnWallet.',
  hash: 'eMkmlzPgQP4eg_t4qHyYqU6Micw4DlrOlGAjDRQplrY',
  blessed: [],
  capabilities: {
    granter: [
      {
        name: 'TRANSFER',
      },
      {
        name: 'GAS_PAYER',
      },
    ],
    acceptor: [],
  },
};

export const getSmartContractMeta = () => {
  // TODO: Find proper ways to retrieve the meta data
  // Idea's could be any DB while a smart contract holds the hash of the meta data
  return [coinMeta, deliveryMeta, webauthnWalletMeta];
};

export const getGranterCapabilityMeta = (meta: Meta, capability: string) => {
  return meta.capabilities.granter.find(({ name }) =>
    new RegExp(`^${meta.module}\.${name}`).test(capability),
  );
};

export const getAcceptorCapabilityMeta = (meta: Meta, capability: string) => {
  return meta.capabilities.acceptor.find(({ name }) =>
    new RegExp(`^${meta.module}\.${name}`).test(capability),
  );
};

export const filterGranterCapabilities =
  ({
    account,
    meta,
  }: {
    account: Pick<Account, 'accountName'>;
    meta: Meta[];
  }) =>
  (capability: ICap) => {
    const smartContractMeta = meta.find((m) =>
      new RegExp(`^${m.module}\.`).test(capability.name),
    );
    if (!smartContractMeta) return true;
    const capabilityMeta = getGranterCapabilityMeta(
      smartContractMeta,
      capability.name,
    );
    if (!capabilityMeta) return false;

    if (capabilityMeta.argumentIndex === undefined) return true;
    const granter = capability.args[capabilityMeta.argumentIndex];
    return granter === account.accountName;
  };

export const filterAcceptorCapabilities =
  ({
    account,
    meta,
  }: {
    account: Pick<Account, 'accountName'>;
    meta: Meta[];
  }) =>
  (capability: ICap) => {
    const smartContractMeta = meta.find((m) =>
      new RegExp(`^${m.module}\.`).test(capability.name),
    );
    if (!smartContractMeta) return false;
    const capabilityMeta = getAcceptorCapabilityMeta(
      smartContractMeta,
      capability.name,
    );
    if (!capabilityMeta) return false;
    if (capabilityMeta.argumentIndex === undefined) return true;
    const acceptor = capability.args[capabilityMeta.argumentIndex];
    return acceptor === account.accountName;
  };
