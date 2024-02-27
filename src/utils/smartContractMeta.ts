import { Account } from '@/context/AccountsContext';
import { ICap } from '@kadena/types';

const coinMeta = {
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
    TRANSFER: {
      granter: {
        argIndex: 0,
      },
      acceptor: {
        argIndex: 1,
      },
    },
  },
};

const deliveryMeta = {
  name: 'Delivery',
  module: 'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery',
  description:
    'Delivery smart contract that governs ordering and delivery of products.',
  hash: 'hxK8VcEQFl2CkyXxKGwSz02_ccPUoYb24jElkBI_vCk',
  blessed: [],
  capabilities: {
    CREATE_ORDER_LINE: {
      granter: {
        argIndex: 2,
      },
      acceptor: {
        argIndex: 3,
      },
      // TODO: Discuss if this could provide for customizing the lines securely
      // 0: order-id, 2: buyer, 3: merchant, 4: price
      // hash = order-id + buyer + merchant + price + translation provided by dApp
      // Only capabilities who have this hashValues can provide for such customizations
      // Wallet will look up the capability of the smart contract and hash the JSON
      // along with the hashValues and compare with the hash. If it does not match,
      // it will throw an error.
      hashValues: [0, 2, 3, 4],
      hashIndex: 1,
      // translation bundle:
      // hash ( order-id + buyer + merchant + price + translation provided by dApp )
      // { "value": "Pizza margahritate x1 costs 10 KDA",
      // "image": "https://example.com/pizza-margahritate.jpg" }
    },
    SET_READY_FOR_DELIVERY: {
      granter: {
        isSigner: true,
      },
    },
    PICKUP_DELIVERY: {
      granter: {
        argIndex: 0,
      },
      acceptor: {
        argIndex: 1,
      },
    },
    DELIVER_ORDER: {
      granter: {
        argIndex: 0,
      },
      acceptor: {
        argIndex: 1,
      },
    },
  },
};

const webauthnWalletMeta = {
  name: 'WebAuthn Wallet',
  module: 'n_eef68e581f767dd66c4d4c39ed922be944ede505.webauthn-wallet',
  description: 'WebAuthnWallet smart contract that governs WebAuthnWallet.',
  hash: 'eMkmlzPgQP4eg_t4qHyYqU6Micw4DlrOlGAjDRQplrY',
  blessed: [],
  capabilities: {
    TRANSFER: {
      granter: {
        isSigner: true,
      },
    },
    GAS_PAYER: {
      granter: {
        isSigner: true,
      },
    },
  },
};
type CoinMeta = typeof coinMeta;
type DeliveryMeta = typeof deliveryMeta;
type WebAuthnWalletMeta = typeof webauthnWalletMeta;
export type Meta = CoinMeta | DeliveryMeta | WebAuthnWalletMeta;
type MetaDescriptor = {
  isSigner?: boolean;
  argIndex?: number;
};
export type CapabilityMeta = {
  granter?: MetaDescriptor;
  acceptor?: MetaDescriptor;
  hashValues: number[];
  hashIndex: number;
};

export const getSmartContractMeta = () => {
  // TODO: Find proper ways to retrieve the meta data
  // Idea's could be any DB while a smart contract holds the hash of the meta data
  return [coinMeta, deliveryMeta, webauthnWalletMeta];
};

export const getCapabilityMeta = (meta: Meta, capability: string) => {
  return (meta.capabilities as any)[
    capability.replace(new RegExp(`^${meta.module}\.`), '')
  ] as CapabilityMeta;
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
    if (!smartContractMeta) return false;
    const capabilityMeta = getCapabilityMeta(
      smartContractMeta,
      capability.name,
    );
    if (!capabilityMeta?.granter) return false;
    if (capabilityMeta.granter.isSigner) return true;
    const granter = capability.args[capabilityMeta.granter.argIndex];
    if (granter === account.accountName) return true;
    return false;
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
    const capabilityMeta = getCapabilityMeta(
      smartContractMeta,
      capability.name,
    );
    if (!capabilityMeta?.acceptor) return false;
    if (capabilityMeta.acceptor.isSigner) return true;
    const acceptor = capability.args[capabilityMeta.acceptor.argIndex];
    if (acceptor === account.accountName) return true;
    return false;
  };
