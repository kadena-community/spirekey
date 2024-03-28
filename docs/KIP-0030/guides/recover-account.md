# **Recover a Kadena Spirekey account**

After you register a Kadena SpireKey account, the account details are stored on
the blockchain and in the localStorage of your browser. When the localStorage of
your browser is cleared or you want to use your Kadena SpireKey account on
another browser, the [Kadena SpireKey wallet](https://spirekey.kadena.io) has no
way of knowing which of all the accounts stored on the blockchain belong to you.
However, the device you registered your account with still holds the passkey you
created to guard your account. Kadena SpireKey has a feature to recover your
account based on a passkey associated with your account. Your account can be
recovered using any device that belongs to the account. This guide walks you
through the process of recovering an account and explains how to implement
account recovery in your own wallet dApp.

## Create an account

To demonstrate how account recovery works, create an account first, following
the steps in the [create account guide](create-account.md). Note that a passkey
is created with a name that is based on the `Alias` you provided and the
`Network` used by the wallet dApp. In developer mode, you can choose a `Network`
yourself. With an `Alias` "Alice" and `Network` "Testnet", you would see a
passkey with name "Alice (Testnet)" being created during the account creation
process.

## Clear localStorage

Visit [spirekey.kadena.io](https://spirekey.kadena.io) in the browser on your
computer. If you created an account on your phone in the previous step, the
localStorage of your computer's browser will not contain the details of your new
account. If you have created a new account in the browser on your computer, it
should be displayed in your wallet and you need to clear your localStorage in
order to follow along with this guide. In the latter case, open the developer
console of your browser and execute the following command:

```
localStorage.setItem('localAccounts', '[]')
```

Then, refresh the page. With no accounts in your localStorage, the wallet dApp
redirects you to the welcome page.

## Recover your account

Click the "Recover" button on the welcome page or visit
[spirekey.kadena.io/recover](https://spirekey.kadena.io/recover) directly. In
developer mode you have the option to select a specific `Network` to recover an
account from. Otherwise, the wallet dApp will default to the `Network` it is
configured with. Then, click the fingerprint button or "Next" to select a
passkey. If you created the account on your phone in the first step of this
guide, select "On other devices" and scan the QR-code to select a passkey.
Otherwise, directly select the passkey you created in the first step. Confirm
with your fingerprint or Face-ID and the wallet will start recovering your
account. If successful, you will automatically be redirected to the account
overview where you will see your account and all devices that guard it.

## How does it work?

The `webauthn-guard` module of the Kadena SpireKey smart contract emits a
`REGISTER_DEVICE` event containing an account name and credential identifier of
a passkey on every successful transaction containing a call to either the
`register` or `add-device` function. That is, every time your create an account
guarded by a passkey or add the passkey of a device to an existing account. This
allows the wallet dApp to query the Chainweb Data API for `REGISTER_DEVICE`
events containing the credential identifier of the passkey you select on the
account recovery page. If an event is found, the account name can be retrieved
from the event. Next, the wallet dApp executes a local transaction calling the
`get-webauthn-guard` function of the `webauthn-wallet` module with the retrieved
account name as the argument to retrieve all the details of the account from the
blockchain.

## Implement it yourself

### Before you begin

This part of the guide assumes that you are developing your own wallet dApp
using TypeScript against a locally running Devnet.

### Select a passkey

Prompt users to select a passkey on their device that is associated with your
wallet domain. Use the `startAuthentication` method from the
`@simplewebauthn/browser` package and pass the domain as the value of `rpId`. In
the example below `window.location.hostname` is used, but you can pass the
domain in any way you want.

```typescript
import { startAuthentication } from '@simplewebauthn/browser';

const domain = window.location.hostname;

const getCredentialId = async (): string => {
  const authResult = await startAuthentication({
    challenge: 'doesnotreallymatter',
    rpId: domain,
  });
  return authResult.id;
};

const recoverAccount = async () => {
  const credentialId = await getCredentialId();
};

recoverAccount();
```

### Find event

Use the credential identifier to find the event that was emitted when the user's
device was linked to an account. The event can be found by calling the Chainweb
Data API endpoint `/txs/events` with the following query parameters.

| parameter  | description                                                                                       |
| :--------- | :------------------------------------------------------------------------------------------------ |
| param      | The credential identifier of the passkey selected by the user                                     |
| name       | The name of the event (REGISTER_DEVICE)                                                           |
| modulename | The name of the module (webauthn-guard) that emitted the event prefixed with the module namespace |

The code sample below extends the previous example with example code for finding
the `REGISTER_DEVICE` event including the previously obtained credential
identifier. If you are not developing a wallet dApp against a locally running
Devnet, replace the `chainwebDataUrl` and module `namespace` accordingly. For
the sake of brevity, the code sample does not handle edge cases like no events
being found.

```typescript
// Existing implementation omitted for clarity.

interface Event {
  requestKey: string;
}

const chainwebDataUrl = 'http://localhost:8080';
const namespace = 'n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9';

const fetchEvent = async (credentialId: string): Promise<Event> => {
  const eventsResponse = await fetch(
    `${chainwebDataUrl}/txs/events?param=${credentialId}&name=REGISTER_DEVICE&modulename=${namespace}.webauthn-guard`,
  );
  const events = await eventsResponse.json();

  return events[0];
};

const recoverAccount = async () => {
  // Existing implementation omitted for clarity.

  const event = await fetchEvent(credentialId);
};

recoverAccount();
```

### Find account name

The event object contains a field `requestKey`. Use the value of this field to
find the transaction that caused the event to be emitted. The transaction can be
found by calling the Chainweb Data API endpoint `/txs/tx` with the following
query parameter.

| parameter  | description                        |
| :--------- | :--------------------------------- |
| requestkey | The request key of the transaction |

The `REGISTER_DEVICE` event can be emitted from the `register` and the
`add-device` functions of the `webauthn-guard` module. A completed transaction
that contains a call to the `register` function contains the account name in the
`result` field of the transaction object returned by the Chainweb Data API. A
completed transaction that contains a call to the `add-device` function contains
the account name in the `sender` field of the transaction object returned by the
Chainweb Data API. The code sample below provides an example implementation of
finding the account name based on the `requestKey` of a `REGISTER_DEVICE` event.
For the sake of brevity, the code sample does not handle edge cases like no
transaction being found.

```typescript
// Existing implementation omitted for clarity.

interface Transaction {
  result: string;
  sender: string;
}

const chainwebDataUrl = 'http://localhost:8080';

const getAccountName = async (requestKey: string): Promise<string> => {
  const txResponse = await fetch(
    `${chainwebDataUrl}/txs/tx?requestkey=${requestKey}`,
  );
  const tx = await txResponse.json();

  return tx.result === 'Write succeeded' ? tx.sender : tx.result;
};

const recoverAccount = async () => {
  // Existing implementation omitted for clarity.

  const accountName = await getAccountName(event.requestKey);
};

recoverAccount();
```

### Get account details and balance

Now that you recovered the name of the account that the credential id of the
passkey on the user's device belongs to you can proceed to retrieve all details
of the account. This can be achieved by executing a local transaction against
your locally running Devnet or any other network you may be developing your
wallet dApp against. The code example below uses the functional pattern for
creating and executing transactions provided by the `@kadena/client` package.
The transaction includes a call to the `get-webauthn-guard` function of the
`webauthn-wallet` module for retrieving the account details and a call to the
`get-balance` function of the `coin` module to retrieve the account balance. So,
the gist of the Pact command to be executed is as follows and it is, of course,
up to you what programming pattern you want to use to execute it locally.

```pact
[
    (n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.webauthn-wallet.get-webauthn-guard "c:JYqXwmvVTNV5dDiUwoecY-DWRlBUq3j0nGSjxaf6PsE")
    (coin.get-balance "c:JYqXwmvVTNV5dDiUwoecY-DWRlBUq3j0nGSjxaf6PsE")
]
```

Add the following code to your implementation to get the account details based
on the retrieved account name. Finally, you can use the account details to
display the account details in your wallet dApp.

```typescript
// Existing implementation omitted for clarity.

import {
  BuiltInPredicate,
  ChainId,
  createTransaction,
  createClient,
} from '@kadena/client';

import {
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from '@kadena/client/fp';

interface Device {
  domain: string;
  ['credential-id']: string;
  guard: {
    keys: string[];
    pred: BuiltInPredicate;
  };
  name: string;
}

interface Account {
  accountName: string;
  balance: string;
  devices: Device[];
}

const chainwebDataUrl = 'http://localhost:8080';
const networkId = 'development';
const chainId: ChainId = '14';
const namespace = 'n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9';

const client = createClient(({ chainId, networkId }) => {
  return `${chainwebDataUrl}/chainweb/0.0/${networkId}/chain/${chainId}/pact`;
});

const asyncPipe =
  (...args: Array<(arg: any) => any>): ((init: any) => Promise<any>) =>
  (init: any): Promise<any> =>
    args.reduce((chain, fn) => chain.then(fn), Promise.resolve(init));

const getAccountDetails = async (accountName: string): Promise<Account> =>
  asyncPipe(
    composePactCommand(
      execution(
        `[
          (${namespace}.webauthn-wallet.get-webauthn-guard "${accountName}")
          (coin.get-balance "${accountName}")
        ]`,
      ),
      setMeta({ chainId }),
      setNetworkId(networkId),
    ),
    createTransaction,
    (tx) => l1Client.local(tx, { preflight: false }),
    (tx) => {
      if (tx?.result?.status !== 'success') return null;
      const [devices, balance] = tx.result.data;
      return {
        accountName,
        devices: devices.devices || [],
        balance,
      };
    },
  )({});

const recoverAccount = async () => {
  // Existing implementation omitted for clarity.

  const account = await getAccountDetails(accountName);
};

recoverAccount();
```

### Full implementation

```typescript
import { startAuthentication } from '@simplewebauthn/browser';

import {
  BuiltInPredicate,
  ChainId,
  createTransaction,
  createClient,
} from '@kadena/client';

import {
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from '@kadena/client/fp';

interface Event {
  requestKey: string;
}

interface Transaction {
  result: string;
  sender: string;
}

interface Device {
  domain: string;
  ['credential-id']: string;
  guard: {
    keys: string[];
    pred: BuiltInPredicate;
  };
  name: string;
}

interface Account {
  accountName: string;
  balance: string;
  devices: Device[];
}
const domain = window.location.hostname;
const chainwebDataUrl = 'http://localhost:8080';
const networkId = 'development';
const chainId: ChainId = '14';
const namespace = 'n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9';

const getCredentialId = async (): string => {
  const authResult = await startAuthentication({
    challenge: 'doesnotreallymatter',
    rpId: domain,
  });
  return authResult.id;
};

const fetchEvent = async (credentialId: string): Promise<Event> => {
  const eventsResponse = await fetch(
    `${chainwebDataUrl}/txs/events?param=${credentialId}&name=REGISTER_DEVICE&modulename=${namespace}.webauthn-guard`,
  );
  const events = await eventsResponse.json();

  return events[0];
};

const getAccountName = async (requestKey: string): Promise<string> => {
  const txResponse = await fetch(
    `${chainwebDataUrl}/txs/tx?requestkey=${requestKey}`,
  );
  const tx = await txResponse.json();

  return tx.result === 'Write succeeded' ? tx.sender : tx.result;
};

const client = createClient(({ chainId, networkId }) => {
  return `${chainwebDataUrl}/chainweb/0.0/${networkId}/chain/${chainId}/pact`;
});

const asyncPipe =
  (...args: Array<(arg: any) => any>): ((init: any) => Promise<any>) =>
  (init: any): Promise<any> =>
    args.reduce((chain, fn) => chain.then(fn), Promise.resolve(init));

const getAccountDetails = async (accountName: string): Promise<Account> =>
  asyncPipe(
    composePactCommand(
      execution(
        `[
          (${namespace}.webauthn-wallet.get-webauthn-guard "${accountName}")
          (coin.get-balance "${accountName}")
        ]`,
      ),
      setMeta({ chainId }),
      setNetworkId(networkId),
    ),
    createTransaction,
    (tx) => l1Client.local(tx, { preflight: false }),
    (tx) => {
      if (tx?.result?.status !== 'success') return null;
      const [devices, balance] = tx.result.data;
      return {
        accountName,
        devices: devices.devices || [],
        balance,
      };
    },
  )({});

const recoverAccount = async () => {
  const credentialId = await getCredentialId();
  const event = await fetchEvent(credentialId);
  const accountName = await getAccountName(event.requestKey);
  const account = await getAccountDetails(accountName);
};

recoverAccount();
```
