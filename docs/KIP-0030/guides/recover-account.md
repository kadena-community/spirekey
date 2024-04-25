---
title: Recover Kadena SpireKey accounts
description:
  If you're an application developer and have integrated Kadena SpireKey
  accounts and WebAuthN authentication and authorization services into your
  application, you can also implement account recovery using a Kadena SpireKey
  passkey.
menu: Authenticate and authorize
label: Recover accounts
order: 2
layout: full
---

# Recover a Kadena Spirekey account

After you register a device for a Kadena SpireKey account, the account details
are stored on the Kadena blockchain and in the `Local storage` property for the
browser you used to register the account. You can view this information using
the Developer Tools for the browser by selecting **Application**, then expanding
**Storage**. If you clear local storage—for example, by selecting **Clear
browsing data**—or try to use a different browser to access your Kadena SpireKey
account, the [Kadena SpireKey wallet](https://spirekey.kadena.io) won't be able
to identify the account that belongs to you or recognize you as a registered
user. However, you can recover your account information through the passkey
stored on any device you added to your account. For example, if you used a smart
phone to register a Kadena SpireKey accoun, you can use the passkey stored on
that phone to recover your account information.

## Identify the passkey for an account

When you register an account as described in
[Register an account](/build/authentication/register), Kadena SpireKey creates a
passkey for the device you are using with the name you use for the account
**Alias** and a selected **Network**. For example, if you access Kadena SpireKey
deployed on the Kadena test network and specify Lola as the alias for tha new
account, the passkey created for the device and account combination would be
Lola (Testnet). If you used a laptop to register this account, your passkey
might be based on a fingerprint stored in a secure enclave on the device or
recorded on a security key you attached to the device.

## Clear local storage

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
using TypeScript against Testnet.

### Select a passkey

Prompt users to select a passkey on their device that is associated with your
wallet domain. Use the `startAuthentication` method from the
`@simplewebauthn/browser` package and pass the domain as the value of `rpId`. In
the example below `window.location.hostname` is used, but you can pass the
domain in any way you want. Either way, the the rpId needs to match with the
host name, otherwise the domain this app is running on. Furthermore, if the host
is not localhost, the host needs to be secured with https. Otherwise the request
will fail. The value of the `challenge` field is required, but the exact value
does not really matter, because no session will be created and
`startAuthentication` is only used to retrieve the credential id of a device
associated with an account to recover.

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
identifier. If you are developing a wallet dApp against a locally running
Devnet, replace the `chainwebDataUrl` and module `namespace` accordingly. For
the sake of brevity, the code sample does not handle edge cases like no events
being found.

```typescript
// Existing implementation omitted for clarity.

interface Event {
  params: string[];
}

const chainwebDataUrl = 'https://estats.testnet.chainweb.com';
const namespace = 'n_eef68e581f767dd66c4d4c39ed922be944ede505';

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

The event object contains a field `params`. The first parameter in this array is
the Webauthn Guard account (w:account). Use the value of this field to retrieve
the Webauthn Wallet account (c:account) by making a local transaction that calls
the `get-account-name` function of the `webauthn-wallet` contract. The code
example below uses the functional pattern for creating and executing
transactions provided by the `@kadena/client` package. The gist of the Pact
command to be executed is as follows and it is, of course, up to you what
programming pattern you want to use to execute it locally.

```pact
`(n_eef68e581f767dd66c4d4c39ed922be944ede505.webauthn-wallet.get-account-name "w:lImvUWTPtU99aeL9IY8eSxqnbD6bIBzczlMqGlh6OLB:keys-any")`
```

Add the following code to retrieve the Webauthn Wallet account name from the
Webauthn Guard account name in the event.

```typescript
// Existing implementation omitted for clarity.

import { createTransaction, createClient } from '@kadena/client';
import {
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from '@kadena/client/fp';
import { ChainId } from '@kadena/types';

const chainwebDataUrl = 'https://estats.testnet.chainweb.com';
const networkId = 'testnet04';
const chainId: ChainId = '14';

const client = createClient(({ chainId, networkId }) => {
  return `${chainwebDataUrl}/chainweb/0.0/${networkId}/chain/${chainId}/pact`;
});

const asyncPipe =
  (...args: Array<(arg: any) => any>): ((init: any) => Promise<any>) =>
  (init: any): Promise<any> =>
    args.reduce((chain, fn) => chain.then(fn), Promise.resolve(init));

const getAccountName = async (wAccount: string): Promise<string> =>
  asyncPipe(
    composePactCommand(
      execution(
        `(${namespace}.webauthn-wallet.get-account-name "${wAccount}")`,
      ),
      setMeta({
        chainId: process.env.CHAIN_ID as ChainId,
        gasLimit: 1000,
        gasPrice: 0.0000001,
        ttl: 60000,
      }),
      setNetworkId(networkId),
    ),
    createTransaction,
    (tx) =>
      client.local(tx, { preflight: false, signatureVerification: false }),
    (tx) => tx.result.data,
  )({});

const recoverAccount = async () => {
  // Existing implementation omitted for clarity.

  const accountName = await getAccountName(event.params[0]);
};

recoverAccount();
```

### Get account details and balance

Now that you recovered the name of the account that the credential id of the
passkey on the user's device belongs to you can proceed to retrieve all details
of the account. This can be achieved by executing a local transaction against
Testnet or any other network you may be developing your wallet dApp against. The
code example below again uses the functional pattern for creating and executing
transactions provided by the `@kadena/client` package. The transaction includes
a call to the `get-webauthn-guard` function of the `webauthn-wallet` module for
retrieving the account details and a call to the `get-balance` function of the
`coin` module to retrieve the account balance. So, the gist of the Pact command
to be executed is as follows.

```pact
[
    (n_eef68e581f767dd66c4d4c39ed922be944ede505.webauthn-wallet.get-webauthn-guard "c:JYqXwmvVTNV5dDiUwoecY-DWRlBUq3j0nGSjxaf6PsE")
    (coin.get-balance "c:JYqXwmvVTNV5dDiUwoecY-DWRlBUq3j0nGSjxaf6PsE")
]
```

Add the following code to your implementation to get the account details based
on the retrieved account name. Finally, you can use the account details to
display the account details in your wallet dApp.

```typescript
// Existing implementation omitted for clarity.

interface Device {
  domain: string;
  ['credential-id']: string;
  guard: {
    keys: string[];
    pred: 'keys-any';
  };
  name: string;
}

interface Account {
  accountName: string;
  balance: string;
  devices: Device[];
}

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
    (tx) => client.local(tx, { preflight: false }),
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

import { ChainId } from '@kadena/types';

interface Event {
  params: string[];
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
const chainwebDataUrl = 'https://estats.testnet.chainweb.com';
const networkId = 'testnet04';
const chainId: ChainId = '14';
const namespace = 'n_eef68e581f767dd66c4d4c39ed922be944ede505';

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

const client = createClient(({ chainId, networkId }) => {
  return `${chainwebDataUrl}/chainweb/0.0/${networkId}/chain/${chainId}/pact`;
});

const asyncPipe =
  (...args: Array<(arg: any) => any>): ((init: any) => Promise<any>) =>
  (init: any): Promise<any> =>
    args.reduce((chain, fn) => chain.then(fn), Promise.resolve(init));

const getAccountName = async (wAccount: string): Promise<string> =>
  asyncPipe(
    composePactCommand(
      execution(
        `(${namespace}.webauthn-wallet.get-account-name "${wAccount}")`,
      ),
      setMeta({
        chainId: process.env.CHAIN_ID as ChainId,
        gasLimit: 1000,
        gasPrice: 0.0000001,
        ttl: 60000,
      }),
      setNetworkId(networkId),
    ),
    createTransaction,
    (tx) =>
      client.local(tx, { preflight: false, signatureVerification: false }),
    (tx) => tx.result.data,
  )({});

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
    (tx) => client.local(tx, { preflight: false }),
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
  const accountName = await getAccountName(event.params[0]);
  const account = await getAccountDetails(accountName);
};

recoverAccount();
```
