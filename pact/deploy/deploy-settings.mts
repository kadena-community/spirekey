import { ValueOf } from "next/dist/shared/lib/constants";
import deploy, { DeploySettings } from "./deploy.mjs";

const l1: ValueOf<DeploySettings["hosts"]> = {
  chainIds: ["14"],
  host: "http://localhost:8080",
};
const l2: ValueOf<DeploySettings["hosts"]> = {
  chainIds: ["2"],
  host: "http://localhost:8081",
};

const hosts: DeploySettings["hosts"] = [l1, l2];
const sender00Keypair = {
  publicKey: "368820f80c324bbc7c2b0610688a7da43e39f91d118732671cd9c7500ff43cca",
  secretKey: "251a920c403ae8c8f65f59142316af3c82b631fba46ddea92ee8c95035bd2898",
};
const l2Keyset = {
  keys: ["368820f80c324bbc7c2b0610688a7da43e39f91d118732671cd9c7500ff43cca"],
  pred: "keys-all",
};

type Account = {
  name: string;
  publicKey: string;
  fund: number;
};
const getFundData = (accounts: Account[]) => ({
  code: accounts
    .map(
      ({ name, fund }) =>
        `(coin.transfer-create "sender00" "${name}" (read-keyset "${name}-keyset") ${fund.toPrecision(
          12
        )})`
    )
    .join("\n"),
  caps: [
    ["coin.GAS"],
    ...accounts.map(({ name, fund }) => [
      "coin.TRANSFER",
      "sender00",
      name,
      fund,
    ]),
  ],
  data: accounts.reduce(
    (keys, { name, publicKey }) => ({
      ...keys,
      [`${name}-keyset`]: { keys: [publicKey], pred: "keys-all" },
    }),
    {}
  ),
});

export const getNameSpaceAndKeysetSettings: () => DeploySettings[] = () => [
  {
    hosts,
    networkId: "fast-development",
    sender: "sender00",
    keypair: sender00Keypair,
    data: {
      "l2-keyset": l2Keyset,
    },
    code: `
    (let ((ns-name (ns.create-principal-namespace (read-keyset 'l2-keyset))))
      (define-namespace
        ns-name
        (read-keyset 'l2-keyset )
        (read-keyset 'l2-keyset )
      )
      (namespace ns-name)
      (define-keyset
        (format "{}.{}"
          [ns-name 'l2-keyset]
        )
        (read-keyset 'l2-keyset)
      )
      (define-keyset
        (format "{}.{}"
          [ns-name 'webauthn-keyset]
        )
        (read-keyset 'l2-keyset)
      )
    )
  `,
  },
];
export const getL2DeploymentSettings: (upgrade: boolean) => DeploySettings[] = (
  upgrade
) => [
  {
    hosts,
    networkId: "fast-development",
    codeFile: "./pact/l2-coin.pact",
    sender: "sender00",
    keypair: sender00Keypair,
    data: {
      "l2-keyset": l2Keyset,
      l1: "14",
      upgrade,
    },
  },
  {
    hosts,
    networkId: "fast-development",
    codeFile: "./pact/webauthn.pact",
    sender: "sender00",
    keypair: sender00Keypair,
    data: {
      "webauthn-namespace": "n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9",
      "webauthn-keyset-name":
        "n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.webauthn-keyset",
      upgrade,
    },
  },
];
export const getGasStationAndDeliverySettings: (
  upgrade: boolean
) => DeploySettings[] = (upgrade) => [
  {
    hosts: [l2],
    networkId: "fast-development",
    codeFile: "./pact/gas-station.pact",
    sender: "sender00",
    keypair: sender00Keypair,
    data: {
      ns: "n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9",
      upgrade,
    },
  },
  {
    hosts: [l2],
    networkId: "fast-development",
    codeFile: "./pact/delivery.pact",
    sender: "sender00",
    keypair: sender00Keypair,
    data: {
      ns: "n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9",
      upgrade,
    },
  },
  {
    hosts: [l1, l2],
    networkId: "fast-development",
    codeFile: "./pact/headers.pact",
    sender: "sender00",
    keypair: sender00Keypair,
    data: {
      ns: "n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9",
      upgrade,
      "l2-keyset": l2Keyset,
    },
  },
];
export const getFundSettings: () => DeploySettings[] = () => [
  {
    hosts: [l1],
    networkId: "fast-development",
    sender: "sender00",
    keypair: sender00Keypair,
    ...getFundData([
      /* ! adjust account names and keys based on your data */
      {
        name: "k:fe049607c324521b4bff4e18693bef5566fa86ebccdd30f1ae38ea0ca656af30",
        publicKey:
          "fe049607c324521b4bff4e18693bef5566fa86ebccdd30f1ae38ea0ca656af30",
        fund: 100,
      },
      {
        name: "k:065cc411e24fc791b69da7ec5d705a1c98704bc5d86dc9093874705038fe2628",
        publicKey:
          "065cc411e24fc791b69da7ec5d705a1c98704bc5d86dc9093874705038fe2628",
        fund: 100,
      },
      {
        name: "k:457117167173a2afafdd72fd05106eaee745a37d808476455d3b1a8acc9ad8d5",
        publicKey:
          "457117167173a2afafdd72fd05106eaee745a37d808476455d3b1a8acc9ad8d5",
        fund: 100,
      },
    ]),
  },
  {
    hosts: [l2],
    networkId: "fast-development",
    sender: "sender00",
    keypair: sender00Keypair,
    code: `(coin.transfer "sender00" "u:n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.gas-station.enforce-guard-any:2_2Hme6mPWedofd8myNxsJ1cnHeujAFRQCc4VKEGBP8" 100.0)`,
    caps: [
      ["coin.GAS"],
      [
        "coin.TRANSFER",
        "sender00",
        "u:n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.gas-station.enforce-guard-any:2_2Hme6mPWedofd8myNxsJ1cnHeujAFRQCc4VKEGBP8",
        100.0,
      ],
    ],
  },
];
