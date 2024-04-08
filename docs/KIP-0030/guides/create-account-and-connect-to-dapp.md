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

Your dApp will connect to a Kadena SpireKey wallet dApp that can be hosted
anywhere. You could run it locally as described in the official Kadena Spirekey
[Github repository](https://github.com/kadena-community/webauthn-wallet/), serve
it from your own domain, or use the Kadena SpireKey wallet hosted by Kadena on
[spirekey.kadena.io](spirekey.kadena.io). This guide assumes that you will be
using the latter approach.

## Link to the Kadena SpireKey wallet

On any page of your dApp, create a simple link to the `/connect` page of the
Kadena SpireKey wallet dApp.

```
https://spirekey.kadena.io/connect?returnUrl=http://localhost:3000&networkId=testnet04
```

You need to pass the URL of your dApp as a URL encoded query parameter
`returnUrl`, so the Kadena SpireKey wallet knows where to redirect users back to
after they connect. This example assumes that you are running your dApp locally
on `http://localhost:3000`. On the `/connect` page, the Kadena SpireKey wallet
will check if the user already has an account. If so, the user can simply select
an existing account to connect to your dApp here. Users without a Kadena
SpireKey account will be redirected to the `/register` page of Kadena SpireKey
to create an account on the fly and subsequently be redirected back to your dApp
with the newly created account selected.

A deployment of your dApp may be configured for a specific network to make
transactions on, like Devnet, Testnet, or Mainnet only. A transaction on Testnet
will fail if users connect an account they created on Devnet. To prevent this
from happening you must specify the `networkId` that users can select an account
from, by adding a second query parameter `networkId` to the Kadena SpireKey
wallet URL. In the example URL above, the value of this query parameter is set
to `testnet04`. You can change the value to `mainnet01` or `development` as
needed.

## Create an account

Users without a Kadena SpireKey account on the network you specified will be
redirected to the `/register` page of Kadena SpireKey to create an account on
the fly. In the account creation flow of the Kadena SpireKey wallet dApp, users
need to provide an account alias, a network, webauthn credentials, an icon and a
color. The alias helps users easily identify different accounts in their Kadena
SpireKey wallet. The icon and color help users help users recognize the device
they registered in their Kadena SpireKey wallet. The network determines on what
network users will create their account. Choose Devnet if you are following
along with this guide.

## Connect an account

After users have created their first Kadena SpireKey account or if they already
have an account, they will be redirected to the `/connect` page of the Kadena
SpireKey wallet dApp. Here, they select one of their accounts and press a button
to connect. Then, they will be redirected back to your dApp with their public
account details appended as a base64 encoded query parameter `user` to the
`returnUrl` that you initially provided as part of the link to Kadena SpireKey.
Before moving on to handling the received account data in your dApp, it is worth
mentioning that it is possible to customize the reason that your dApp asks users
to connect their Kadena SpireKey account.

### Show the reason

Add the query parameter `reason` to the Kadena SpireKey wallet URL with a value
containing a more elaborate description of the reason that your dApp requires
account information from the user. The value for this parameter must be URL
encoded. See the example below.

```
https://spirekey.kadena.io/connect?returnUrl=http://localhost:3000&networkId=development&reason=Your%20reason.
```

### Use the account data

After creating an account in the Kadena SpireKey Wallet dApp - if applicable -
and confirming the selected account to connect, users are redirected to your
dApp with their public account details appended as a base64 encoded query
parameter `user`. You can parse the decoded parameter value as a JSON object.
The resulting object will have the following structure.

```json
{
  "accountName": "c:68foI6nNAYN_a6Nu_CNEGiKyVDJlGxKC0dOZLBq6ZeW",
  "alias": "Alice",
  "credentials": [
    {
      "id": "d2eYT3zAklMgZZJNjQ3zJxZ6kuT4tkd_ndePIEWK3Nd",
      "publicKey": "WEBAUTHN-a50102032620012158209a4e83b6d734880b926c0e74bce8e449ac03f0998cb224999d5039651c24534d225820f2804f3c424918786a978c56956628dc93d0d32182973db187084579503cea3c",
      "type": "WebAuthn"
    }
  ],
  "pendingTxIds": ["gzlhITOU8hMaOXHKcSJgxLl0Ir8j2crUnFh20cGcxsR"]
}
```

The decoded and parsed account details are an object with fields: alias,
accountName, credentials and pendingTxIds. The alias has already been explained
above. The account name is the actual name of the account on the blockchain. It
is a string consisting of a `c:` prefix followed by a hash. The credentials
field of the account details object contains an array of credential objects. In
case of a Webauthn account connected from Kadena SpireKey, there will always be
only one credential in this array. The `publicKey` field of the credential
object holds the public key of the user's Webauthn credential. Note that the
private key is not present here. It is securely encrypted and stored on the
user's device. The `pendingTxIds` field will contain the account creation
transaction identifier, in case the user connected with an account that was
created on the fly. You can poll the status of this transaction against the
Chainweb Data API to ensure that you are not creating transactions involving
this account for the user to sign before it is confirmed on the blockchain. If
an account creation transaction is completed before users confirm connecting to
your dApp, then `pendingTxIds` will be empty. The Chainweb Data API to poll
would look as follows, given the pending transaction id from the example account
object above. Other scenarios exist where `pendingTxIds` contains transaction
identifiers related to transactions other than account creation, but these are
beyond the scope of this guide.

```
https://estats.testnet.chainweb.com/txs/tx?requestkey=gzlhITOU8hMaOXHKcSJgxLl0Ir8j2crUnFh20cGcxsR
```

### Optimistic flow

Depending on the network, confirming the account creation transaction on the
blockchain can take some time. If you want to optimize the onboarding of users
to your app for speed, you can opt to allow users to connect their account
optimistically, by adding the `optimistic=true` query parameter to the Kadena
Spirekey wallet dApp URL. This allows users to connect their account to your
dApp before the corresponding transaction (to create the account) is confirmed
on the blockchain. Without this parameter, users without an account will have to
wait until their account is successfully created on the blockchain before they
can return to your dApp. In most cases, dApps can already prepare transactions
involving a user's account before it is minted, so the account can be minted in
the background. Only when the dApp submits a signed transaction it is required
that all signers exist on chain. It's the dApp's responsibility to handle this
case. When there are pending transactions for the connected account, the
requestKeys are appended to the url in an URL encoded way. You can get the array
of pending transactions by decoding the `pendingTxIds` query parameter.

| Optimistic flow                                                     | Non-optimistic flow                                                                                       |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Redirects the user back to the dApp immediately after signing       | Redirects the user back to the dApp after the account creation transaction is confirmed on the blockchain |
| dApp is responsible for monitoring the account creation transaction | Wallet is responsible for monitoring the account creation transaction                                     |
|                                                                     |                                                                                                           |

With the `optimistic=true` parameter, the connect url would look like this:

```
https://spirekey.kadena.io/connect?returnUrl=http://localhost:3000&networkId=development&reason=Your%20reason&optimistic=true
```

With this connect url, the user will be redirected to the following url after
connecting their account:

```
https://localhost:3000?user=eyJhY2NvdW50TmFtZSI6ImM6NjhmbyI2bk5BWV9hNk51X0NORUdpS3lWREpseUd4S0MwZE9aTEJxNlp1IiwiYWxpYXMiOiJBbGljZSIsImNyZWRlbnRpYWxzIjpbeyJpZCI6ImQyZVlUM3pBa2xNZ1paSk5qUTN6SnhaNmt1VDR0a2RfbmRlUElFV0szTmQiLCJwdWJsaWNQb2ludCI6IldFQkFVVEhOLWE1MDEwMjMyNjIwMDEyMTU4MjA5YTRlODNiNmQ3MzQ4ODBiOTI2YzBlNzRiY2U4ZTg0OWFjMDNmMDk5OGNiMjI0OTk5ZDUwMzk2NTFjMjQ1MzQxZDIyNTgyMDYwZjI4MDRmM2M0MjQ5MTg3ODZhOTc4YzU2OTU2MjhkYzkzZDQzMjE4MjkyNzNkYjE4NzA4NDU3OTUwM2NlYTNhM2MifV19XQ==&pendingTxIds=%5B%22Z3psaElUT1U4aE1hT1hIS2NTSkd4TGwwSXJoMmNyVW5GaDIwY0djOHhzUg%3D%3D%22%5D
```

In this example there is a pending transaction with requestKey
`Z3psaElUT1U4aE1hT1hIS2NTSkd4TGwwSXJoMmNyVW5GaDIwY0djOHhzUg==`.
