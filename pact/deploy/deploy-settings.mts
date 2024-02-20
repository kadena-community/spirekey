import { ValueOf } from 'next/dist/shared/lib/constants';
import { DeploySettings } from './deploy.mjs';

const l1: ValueOf<DeploySettings['hosts']> = {
  chainIds: ['14'],
  host: 'http://127.0.0.1:8080',
};

const hosts: DeploySettings['hosts'] = [l1];
const sender00Keypair = {
  publicKey: '368820f80c324bbc7c2b0610688a7da43e39f91d118732671cd9c7500ff43cca',
  secretKey: '251a920c403ae8c8f65f59142316af3c82b631fba46ddea92ee8c95035bd2898',
};
const l2Keyset = {
  keys: ['368820f80c324bbc7c2b0610688a7da43e39f91d118732671cd9c7500ff43cca'],
  pred: 'keys-all',
};

type Account = {
  name: string;
  cname: string;
  fund: number;
};
const getFundData = (accounts: Account[]) => ({
  code: accounts
    .map(
      ({ name, cname, fund }) =>
        `(coin.transfer-create
           "sender00"
           "${cname}"
           (n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.webauthn.get-account-guard "${name}")
           ${fund.toPrecision(12)})`,
    )
    .join('\n'),
  caps: [
    ['coin.GAS'],
    ...accounts.map(({ cname, fund }) => [
      'coin.TRANSFER',
      'sender00',
      cname,
      fund,
    ]),
  ] as any,
  data: {},
});

export const getNameSpaceAndKeysetSettings: () => DeploySettings[] = () => [
  {
    hosts,
    networkId: 'fast-development',
    sender: 'sender00',
    keypair: sender00Keypair,
    data: {
      'webauthn-keyset': l2Keyset,
    },
    code: `
    (let ((ns-name (ns.create-principal-namespace (read-keyset 'webauthn-keyset))))
      (define-namespace
        ns-name
        (read-keyset 'webauthn-keyset )
        (read-keyset 'webauthn-keyset )
      )
      (namespace ns-name)
      (define-keyset
        (format "{}.{}"
          [ns-name 'l2-keyset]
        )
        (read-keyset 'webauthn-keyset)
      )
      (define-keyset
        (format "{}.{}"
          [ns-name 'webauthn-keyset]
        )
        (read-keyset 'webauthn-keyset)
      )
    )
  `,
  },
];
export const getL2DeploymentSettings: (upgrade: boolean) => DeploySettings[] = (
  upgrade,
) => [
  {
    hosts,
    networkId: 'fast-development',
    codeFile: './pact/l2-coin.pact',
    sender: 'sender00',
    keypair: sender00Keypair,
    data: {
      'l2-keyset': l2Keyset,
      l1: '14',
      upgrade,
    },
  },
  {
    hosts,
    networkId: 'fast-development',
    codeFile: './pact/webauthn-guard.pact',
    sender: 'sender00',
    keypair: sender00Keypair,
    data: {
      'webauthn-namespace': 'n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9',
      'webauthn-keyset-name':
        'n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.webauthn-keyset',
      upgrade,
    },
  },
];

export const getWalletSettings: (upgrade: boolean) => DeploySettings[] = (
  upgrade: boolean,
) => [
  {
    hosts,
    networkId: 'fast-development',
    codeFile: './pact/webauthn-wallet.pact',
    sender: 'sender00',
    keypair: sender00Keypair,
    data: {
      'webauthn-keyset-name':
        'n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.webauthn-keyset',
      'webauthn-namespace': 'n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9',
      upgrade,
    },
  },
  {
    hosts,
    networkId: 'fast-development',
    code: `(coin.transfer-create "sender00" "cookie-shop" (read-keyset 'cookie-ks) 0.0000001)`,
    sender: 'sender00',
    keypair: sender00Keypair,
    data: {
      'cookie-ks': {
        keys: [sender00Keypair.publicKey],
        pred: 'keys-all',
      },
    },
    caps: [
      ['coin.GAS'],
      ['coin.TRANSFER', 'sender00', 'cookie-shop', 0.0000001],
    ] as any,
  },
  {
    hosts,
    networkId: 'fast-development',
    codeFile: './pact/gas-station.pact',
    sender: 'sender00',
    keypair: sender00Keypair,
    data: {
      ns: 'n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9',
      'ks-name': 'webauthn-keyset',
      upgrade: false,
    },
  },
];

export const getFundSettings: () => DeploySettings[] = () => [
  {
    hosts,
    networkId: 'fast-development',
    sender: 'sender00',
    keypair: sender00Keypair,
    code: `(coin.transfer "sender00" "u:n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.gas-station.enforce-guard-any:7AdJhJTZk-wJEAWGaoO36HADDU58EtRw5La0LGw1ErI" 100.0)`,
    caps: [
      ['coin.GAS'],
      [
        'coin.TRANSFER',
        'sender00',
        'u:n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.gas-station.enforce-guard-any:7AdJhJTZk-wJEAWGaoO36HADDU58EtRw5La0LGw1ErI',
        100.0,
      ],
    ] as any,
  },
];
