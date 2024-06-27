# **Signing transactions**

If you are developing your own Kadena SpireKey wallet dApp you need to provide a
way for users to sign transactions created by dApps connected to your wallet.
This guide covers how to enable users to sign a transaction using a passkey on
their device that is associated with the public key in the signers array of the
transaction object (see the [send transaction](send-transaction.md) guide).

## Before you begin

This guide assumes that you are developing your own wallet dApp using TypeScript
against a locally running Devnet. It also assumed that your wallet dApp already
allows users to create an account and connect to another dApp. Your wallet
should also be able to store accounts created by users in a format similar to
the following JSON structure.

```
[
    {
        "accountName": "c:t0pUzo6wRkhXSybTGqL_fCNUZyHRAxd2hkQcgB604zB",
        "alias": "Alice",
        "devices":[
            {
                "guard":{
                    "pred":"keys-any",
                    "keys": [
                        "WEBAUTHN-a5010203262001215820f27eab0360cdc0cbf55d8853ada4beeddbfbd5edef86117750b633324f0e3eb12258201d02cb03f7b4ee000c6489596c02efeb16bf2225b158ca5b0f825dc99b003990"
                    ]
                },
                "domain":"http://localhost:1337","credential-id":"gOblRKi5Fr9rHk9YCaPvtp4Ep_bskDSHmiHDSwWgPCd","name":"desktop_#E8C600 ",
                "deviceType": "desktop",
                "color": "#E8C600"
            }
        ],
        "balance":100
    }
]
```

## Capabilities to sign for

A transaction can have one or more signers, each with a unique public key and
set of capabilities to sign for. In the case of multiple signers there are two
possible scenarios. The user who is currently signing can be the owner of all
the accounts - or the one account - containing devices that are associated with
all the public keys in the signers array of the transaction. Or, other users own
the accounts - or one account - containing devices that are associated with some
of the public keys in the signers array of the transaction. Finally, there are
edge cases in which users enter the signing flow of your wallet dApp with a
transaction containing public keys in the signers array not associated with any
of their devices or a transaction they have already signed for. Handle these
edge cases at your own discretion.

Assuming that you have assigned the JSON structure containing the accounts of a
user who enters the signing flow of your wallet dApp in a `const accounts`, you
can find the capabilities this user has to sign for as follows.

```typescript
import type { ICommandPayload } from '@kadena/types';

interface Account {
  alias: string;
  accountName: string;
  balance: string;
  devices: Device[];
  networkId: string;
}

interface Device {
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
}

const encodedTransaction = new URLSearchParams(window.location.search).get(
  'transaction',
);

const transaction = JSON.parse(
  Buffer.from(encodedTransaction, 'base64').toString(),
);

const transactionData: ICommandPayload = JSON.parse(transaction.cmd);

// Get all public keys in the signers array of the transaction
const publicKeys: string[] = transactionData.signers.map(
  (signer: { pubKey: string }) => signer.pubKey,
);

// Filter these public keys down to the ones associated with a device that is
// part of an account owned by the user who is currently signing
const currentUserPublicKeys = publicKeys.filter((key) =>
  accounts.some((account) =>
    account.devices.some((device) => device.guard.keys.includes(key)),
  ),
);

// Get the signer objects from the transaction that the current user can sign for
const currentUserSigners = transactionData.signers.filter(
  (signer: { pubKey: string }) => currentUserPublicKeys.includes(signer.pubKey),
);
```

## Devices to sign with

Now that you have narrowed down the signer objects from the transaction that are
relevant for the current user you can look up the details of each device
associated with the public key in each signer object. This can be achieved as
follows.

```typescript
interface Account {
  devices: Device[];
}

interface Device {
  guard: {
    keys: string[];
    pred: 'keys-any';
  };
  pendingRegistrationTxs?: ITransactionDescriptor[];
}

const getDeviceByPublicKey = (accounts: Account[], publicKey: string) => {
  for (const account of accounts) {
    for (const device of account.devices) {
      if (device.guard.keys.includes(publicKey)) {
        return device;
      }
    }
  }
};

const devices = currentUserPublicKeys.map((publicKey) =>
  getDeviceByPublicKey(accounts, publicKey),
);
```

## Adding signatures to the transaction

You can now proceed to request signatures from the user who is currently
signing. Typically, a Kadena SpireKey wallet would display the capabilities in
each signer object to be signed alongside a button to initiate the signature
creation. The [capability translations](capability-translation.md) guide covers
best practices for displaying capabilities to sign for. In the current guide you
will simply loop over the signers objects relevant to the user who is currently
signing and create signatures for each respective set of capabilities.

```typescript
import { ICommand, addSignatures } from '@kadena/client';
import {
  base64URLStringToBuffer,
  startAuthentication,
} from '@simplewebauthn/browser';

interface SignResponse {
  signature: string;
  authenticatorData: string;
  clientDataJSON: string;
}

const decode = (input: string) =>
  Buffer.from(base64URLStringToBuffer(input)).toString('base64');

const getSig = (response: SignResponse) => {
  const signature = decode(response.signature);
  const authenticatorData = decode(response.authenticatorData);
  const clientDataJSON = decode(response.clientDataJSON);

  return { sig: signature, authenticatorData, clientDataJSON };
};

const getPublicKey = (
  accounts: Account[],
  credentialId: Device['credential-id'],
) => {
  for (const account of accounts) {
    for (const device of account.devices) {
      if (credentialId === device['credential-id']) {
        return device.guard.keys[0];
      }
    }
  }
  throw new Error('No public key found');
};

const sign = async (transaction: ICommand, device: Device) => {
  const result = await startAuthentication({
    challenge: transaction.hash,
    rpId: window.location.hostname,
    allowCredentials: [{ id: device['credential-id'], type: 'public-key' }],
  });

  return addSignatures(transaction, {
    ...getSig(result.response),
    pubKey: getPublicKey(accounts, credentialId),
  });
};

const signAll = async (transaction: ICommand) => {
  let signedTransaction: ICommand | undefined;
  for (device of devices) {
    signedTransaction = await sign(signedTransaction || transaction);
  }
};

sign(transaction);
```

## Optimistic signing

The devices that users sign with must be registered on chain for the signed
transaction to succeed. It is, however, possible for uses to sign a transaction
with a device that is still pending registration on the blockchain. This is
called 'optimistic signing'. When a user connects an account from your wallet
dApp to another dApp, that dApp receives the request key of the transaction for
registering a device to an account if the respective transaction is still
pending. The dApp can use this request key to poll the Chainweb Data API for the
completion of any device registration transactions. Once the registration of all
devices that signed a transaction is confirmed on the blockchain, the dApp can
send the signed transaction to the blockchain. If you do not want to allow
optimistic signing in your wallet dApp, you can check for unconfirmed devices
using the following example code.

```typescript
const pendingRegistrationTransactions = devices
  .map((device) => device?.pendingRegistrationTxs?.length)
  .filter(Boolean);

if (pendingRegistrationTransactions.length > 0) {
  throw new Error('You are not allowed to sign optimistically');
}
```

## Pass on a signed transaction

A client dApp can pass a `returnUrl` query parameter when it redirects to the
sign page of your wallet dApp, specifying where to redirect users back to after
signing a transaction. Append a search parameter `transaction` with the base64
encoded, stringified, signed transaction object as value to the returnUrl.
Finally, redirect the user back to the updated return URL. If the transaction is
completely signed, the client dApp can submit the transaction. If additional
signatures are required, the signed transaction can be used to create a new link
to the signing page of your wallet dApp to be shared with other signers.

```typescript
const returnUrl = new URLSearchParams(window.location.search).get('returnUrl');
const updatedReturnUrl = new URL(returnUrl);
updatedReturnUrl.searchParams.append(
  transaction,
  Buffer.from(JSON.stringify(transaction)).toString('base64'),
);
window.location.href = updatedReturnUrl.toString();
```
