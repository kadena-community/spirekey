# **Create an account and connect to a dApp**

Decentralized applications (dApps) offer convenient avenues for individuals to
engage in transactions on the blockchain. However, before dApps can execute
transactions, they require knowledge of which account will sign for them.
Typically, users connect a cryptocurrency wallet to the dApp and designate an
account for subsequent transactions. Kadena Spirekey simplifies this process,
facilitating the creation and connection of accounts to dApps effortlessly. This
article serves as a pragmatic guide for dApp developers, detailing the
integration of dApps with Kadena SpireKey. It provides step-by-step instructions
on recognizing if a Kadena SpireKey account is connected to your dApp, linking
to the Kadena SpireKey wallet dApp, creating a Kadena SpireKey account, sharing
a Kadena SpireKey account from the Kadena SpireKey wallet back to the dApp, and
displaying the connected account within the dApp. After following this guide,
your users will be able to connect their Kadena SpireKey account to your dApp.
Subsequently, your dApp can utilize the connected account to generate blockchain
transactions, which the account owner can sign for. Further instructions on
transaction creation and signing are elaborated in subsequent chapters.

## Before you begin

Set up a project scaffold for your dApp using the platform and framework of your
choice. This guide assumes a React based web application. Your dApp will connect
to a Kadena SpireKey wallet dApp that can be hosted anywhere. You could for
instance use [spirekey.kadena.io](spirekey.kadena.io), host it yourself, or run
it locally as described in the official Kadena Spirekey
[Github repository](https://github.com/kadena-community/webauthn-wallet/). This
guide assumes that you will be using the latter approach. Kadena SpireKey offers
you the freedom to adapt and deploy its smart contracts to fit your needs.
However, this guide assumes that you have deployed the smart contracts as
provided in the offical Github repository to your locally running Devnet.

## Link to the Kadena SpireKey wallet

On the homepage of your dApp, create a simple link to the `/connect` page of the
Kadena SpireKey wallet dApp, using the example code below. You need to pass the
URL of your dApp as a base64 encoded query parameter `returnUrl`, so the Kadena
SpireKey wallet knows where to redirect users back to after they connect. On the
`/connect` page, the Kadena SpireKey wallet will check if the user already has
an account. If so, the user can simply select an existing account to connect to
your dApp here. Users without a Kadena SpireKey account will be redirected to
the `/register` page of Kadena SpireKey to create an account on the fly and
subsequently be redirected back to your dApp with the newly created account
selected.

A deployment of your dApp may be configured for a specific network to make
transactions on, like Devnet, Testnet, or Mainnet only. A transaction on Devnet
will fail if users connect an account they created on Testnet. To prevent this
from happening you can force users to select an account on a specific network.
Add a second query parameter `networkId` to the Kadena SpireKey wallet URL, with
the required network identifier as value.

```jsx
/* ./src/App.js */

export default function App() {
  const spirekeyHost = 'http://localhost:1337';
  const networkId = 'development';
  const returnUrl = btoa(window.location.href);
  const href = `${spirekeyHost}/connect?returnUrl=${returnUrl}&networkId=${networkId}`;

  return (
    <div className="App">
      <a id="connect" href={href}>
        Connect
      </a>
    </div>
  );
}
```

## Create an account

In the account creation flow of the Kadena SpireKey wallet dApp, users need to
provide an account alias, a network, webauthn credentials, an icon and a color.
The alias helps users easily identify different accounts in their Kadena
SpireKey wallet. The icon and color help users help users recognize the device
they registered in their Kadena SpireKey wallet. The network determines on what
network users will create their account. Choose Devnet if you are following
along with this guide.

## Connect an account

After users have created their first Kadena SpireKey account or if they already
have an account, they will be redirected to the `/connect` page of the Kadena
SpireKey wallet dApp. Here, they select one of their account and press a button
to connect. Then, they will be redirected back to your dApp with their public
account details appended as a base64 encoded query parameter `user` to the
`returnUrl` that you initially provided as part of the link to Kadena SpireKey.
Before moving on to handling the received account data in your dApp, it is worth
mentioning that it is possible to customize the reason that your dApp asks users
to connect their Kadena SpireKey account.

### Show the reason

Add the query parameter `reason` to the Kadena SpireKey wallet URL with a value
containing a more elaborate description of the reason that your dApp requires
account information from the user. The value for this parameter must be base64
encoded. See the example below.

```JavaScript
/* ./src/App.js */

const reason = btoa('Creating transactions for in-game purchases');
const href = `${spirekeyHost}/connect?returnUrl=${returnUrl}&networkId=${networkId}&reason=${reason}`;
```

### Use the account data

After creating an account in the Kadena SpireKey Wallet dApp - if applicable -
and confirming the selected account to connect, users are redirected to your
dApp with their public account details appended as a base64 encoded query
parameter `user`. You can parse and display the account details as outlined in
the example code below. In this example, the link to the Kadena SpireKey wallet
is displayed if no user details are present in the URL. If user details are
present, it means that the user connected a Kadena SpireKey account, so the user
can recognize the account being successfully connected to your dApp.

The decoded and parsed account details are an object with fields: credentials,
accountName, alias and pendingTxIds. The alias has already been explained above.
The account name is the actual name of the account on the blockchain. It is a
string consisting of a `c:` prefix followed by a hash.

```jsx
/* ./src/App.js */

export default function App() {
  const spirekeyHost = 'http://localhost:1337';
  const networkId = 'development';
  const returnUrl = btoa(window.location.href);
  const href = `${spirekeyHost}/connect?returnUrl=${returnUrl}&networkId=${networkId}`;

  const urlParams = new URLSearchParams(window?.location?.search);
  const user = urlParams.get('user');
  const account = user ? JSON.parse(atob(user)) : null;

  return (
    <div className="App">
      {!account && (
        <a id="connect" href={href}>
          Connect
        </a>
      )}
      {!!account && (
        <>
          <h1>Welcome, {account.alias}!</h1>
          <h2>Account name</h2>
          <p>{account.accountName}</p>
          <h2>Credentials</h2>
          {account.credentials.map((credential, index) => (
            <div key={index}>
              <h3>Credential</h3>
              <h4>Type</h4>
              <p>{credential.type}</p>
              <h4>Public key</h4>
              <p>{credential.publicKey}</p>
              <h4>Identifier</h4>
              <p>{credential.id}</p>
            </div>
          ))}
          {JSON.stringify(account)}
          <h2>Pending transaction identifiers</h2>
          <p>{JSON.stringify(account.pendingTxIds)}</p>
        </>
      )}
    </div>
  );
}
```

### Check if the connected account is minted on the blockchain

The credentials field of the account details object contains an array of
credential objects. In case of a Webauthn account connected from Kadena
SpireKey, there will always be only one credential in this array. The
`publicKey` field of the credential object holds the public key of the user's
Webauthn credential. Note that the private key is not present here. It is
securely encrypted and stored on the user's device. The `pendingTxIds` field
will contain the account creation transaction identifier, in case the user
connected with an account that was created on the fly. You can poll the status
of this transaction against the Chainweb Data API to ensure that you are not
creating transactions involving this account for the user to sign before it is
confirmed on the blockchain. If an account creation transaction is completed
before users confirm connecting to your dApp, then `pendingTxIds` will be empty.
You can poll the Chainweb Data API for the status of the transaction as follows.

```JavaScript
fetch(`http://localhost:8080/txs/tx?requestkey=${account.credentials[0].pendingTxIds[0]}`)
  .then(response => response.json())
  .then(transaction => {
    if (transaction.result === 'success') {
      console.log(`The account ${account.accountName} exists!`);
    }
  });
```
