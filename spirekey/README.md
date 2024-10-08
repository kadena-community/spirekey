# WebAuthn Wallet

To get a grasp of the reason to build a WebAuthn Wallet, please read the
[KIP](./docs/KIP-0023/KIP-0023.md)

# Kadena SpireKey

Kadena introduces SpireKey, a more secure and user-friendly way to interact with
the blockchain.

SpireKey harnesses the power of WebAuthn, allowing users to securely generate
and store key pairs directly on their hardware devices. These key pairs can be
accessed through Touch ID or Face ID, enabling password-free logins and
transaction signings. By ensuring the private key is securely stored on the
user's hardware device and eliminating the need for password storage, SpireKey
significantly enhances security. This method provides a seamless and convenient
user experience similar to Apple Pay or Google Pay.

In addition to simplifying key pair generation and authentication, SpireKey
offers advanced account management features. Users can retroactively add
additional keysets and adjust authentication requirements, enhancing account
security. The flexible account architecture allows users to choose or switch
wallets easily, as account information is not tied to any specific wallet.

By decoupling account management and transaction handling from services,
SpireKey aims to provide a unified account solution for all blockchain
interactions. This approach reduces operational requirements for companies while
offering users greater privacy. Our initial goal is to make blockchain
interaction so intuitive and straightforward that anyone can do it, laying the
foundation for more ambitious developments in the future.

## Community feedback

SpireKey is currently in active development, and we're continuously learning
from the experiences of both developers and end users. Your feedback is
invaluable to us as we strive to make ongoing improvements. The current version
of SpireKey is available for testing on `testnet`, and while interfaces may
evolve, we encourage you to integrate SpireKey into your `testnet` dApps. Join
us in making blockchain accessible to everyone—your insights will help shape the
future of SpireKey!

## Prerequisite

To get started you need to have the following installed:

- docker
- pnpm > 9
- node > 20

## Installation

We need
[devnet](https://github.com/kadena-io/devnet/tree/main/nix#running-the-devnet-docker-image)
to run this application for development. A special image has been prepared for
development using WebAuthn. The image is called `kadena/devnet:latest`. The
command to run is:

```sh
docker volume create l1
docker run -it -p 8080:8080 -v l1:/data kadena/devnet:latest
```

When devnet is up and running, you can deploy the contracts using:

```sh
pnpm install
pnpm run deploy /absolute/path/to/your/signers.json
```

Here is an example of the [signers.json](./signers-example.json).

Now the app is ready to start:

```sh
pnpm run dev
```

Visit the wallet on [localhost:1337](http://localhost:1337)

## Optional

If you want to test the interaction between dApps hosted on a different domain
than the wallet, you can update your `/etc/hosts` file and add an entry similar
to:

```
127.0.0.1       kitchen.local           webshop.local           delivery.local
```

Then you can for example navigate to
[http://kitchen.local:1337/pact](http://kitchen.local:1337/pact) and still sign
from `localhost:1337`.

## Deploying Testnet variant

This is only applicable for developers who have access to one of the keys noted
in here:

```
"a899f127bfa3f6f854850b732d77ae79f61f0b64a1b6b558d5353e6511ff3aaa",
"WEBAUTHN-a50102032620012158209c26a392a00e5d4ed2c523ec6a897f25ef94fcfc2fc1bf0b43b782d2601e5f8b225820445c816cd407c66283085b8714467cd9b50eb38ea8cc87924947a75e140051a9",
"fab89088ef3c85234ba88f1629a623bba23a84ad96b5c5f23508e350937fb494",
"WEBAUTHN-a501020326200121582037f07a7bf08bee77f4aa0aec78e77a14df2115414bd131b8564a7520409b57d622582061f406783153b9cf190af040a127267967fa656be2e6d5f24bf26f4024e5ae55",
"e97f7a898eb96d24eecbbc093a06ce9fbbecd5743bf6c8ddc75fe615bdaa30fc",
"WEBAUTHN-a5010203262001215820ee9e2c329c287449ef8fca0ec1365fdbbbbf5c79886235b470dcdfca212ad9bb225820746bd8b5e5a57c044fc29cd470641e81c72d4b0b3413a34076fab063a4341115",
"9db1970f7e60c464462cd6743093b6373b8a8880c1fcb59fb2cc9c40a61600ea",
"fab92c47ccb1fdd25173e2981ebb29de989acea88792e34cc87298f6a1578842",
"WEBAUTHN-a5010203262001215820f636c860497fb57c697ec0d4c29f5599ad3c96b73d85535a19a268c10c71238b225820970bd62ac3001e67d58031892f44be7e23b9494bcf233d73356c3b6004f57c14"
```

If you wish to have a contract on your `devnet` with the same namespace as on
testnet, run the following command:

```
pnpm run deploy:dev /absolute/path/to/your/signers.json
```

Here is an example of the [signers.json](./signers-example.json).

## Troubleshooting

If after updating or at any point you can't start the project, you can opt to
nuke the local instance. To achieve this recreate the docker volume:

```sh
docker volume rm l1
docker volume create l1
```

Now clear your local storage of your wallet domain. On localhost by default it
will be [http://localhost:1337].

## E2E testing

E2E tests in CI are run automatically. If you'd like to run them locally, some
specific steps are needed:

- Build dApp with NODE_ENV set to test, this will use environment variables from
  `.env.test` and `.env`
- Start Devnet Sandbox using the above instructions
- Optionally: Start the frontend.

Deploying the smart contract is done by the test, if you've not done so
yourself.

```sh
NODE_ENV=test pnpm run build
pnpm run start (optional)
pnpm run test:e2e
```
