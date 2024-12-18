## How to send a transaction from a dApp to SpireKey

Once you've successfully connected your dApp to a SpireKey wallet, you should
have all the necessary information to be able to construct and send a
transaction. In this guide you will learn about constructing a transaction using
a SpireKey account, how to send your unsigned transaction to the SpireKey
wallet, and how you should proceed with the data you receive in return.

### Step 1 - Create a transaction using a SpireKey account

Constructing a transaction that requires a signature from a SpireKey account is
primarly going to be the same as typical transactions however there are some
things to keep in mind.

#### WebAuthn public key scheme

WebAuthn registration uses a different crytographic algorithm to generate public
key pairs than previous accounts on Kadena. This means that the structure of the
public key will need to be differentiated from the other public keys using the
`scheme` attribute.

You will need to use the 'WebAuthn' scheme:

```ts
{ pubKey: webAuthnPublicKey, scheme: 'WebAuthn' }
```

#### WebAuthn account guard

SpireKey uses the `webauthn-wallet` contract to create and manage accounts. When
creating an account for the `coin` contract or other `fungible-v2` contracts, a
user needs to provide an account name and a guard. There are many types of
guards, however _keysets_ are often used to gaurd these types of accounts.
SpireKey accounts are different in that they use a _capability_ defined in the
`webauthn-guard` contract as a guard for these accounts, however, currently
contracts like `coin` cannot bring this capability into scope when trying to
debit an account.

To simplify working with the `coin` contract, the `webauthn-wallet` contract has
implemented its own function `webauthn-wallet.transfer` and custom capabilities
`webauthn-wallet.GAS_PAYER` and `webauthn-wallet.TRANSFER` that can be used in
place of the original corresponding `coin.GAS` and `coin.TRANSFER` capabilities
to satisfy the guard necessary for debiting an account.

> Note: Due to the way chainweb processes the `GAS_PAYER` capability,
> `webauthn-wallet` accounts will need to sign for an additional
> `webauthn-wallet.GAS` capability when paying for gas. We are working on a
> solution to simplify the interface further, which will become available in the
> next chainweb release.

The following is an example of what an unsigned `coin` transfer transaction from
a SpireKey wallet could look like. Note that the value of the `cmd` field would
normally be a stringified JSON object. In the example below it is displayed as
parsed JSON format for the sake of readability.

```json
{
  "cmd": {
    "payload": {
      "exec": {
        "code": "(n_eef68e581f767dd66c4d4c39ed922be944ede505.webauthn-wallet.transfer \"c:bF51UeSqhrSjEET1yUWBYabDTfujlAZke4R70I4rrHc\" \"k:9cb650e653f563d782182a67b73a4d5d553aaf6f1c4928087bb7d91d59b8a227\" 2.00000000000)",
        "data": {}
      }
    },
    "nonce": "kjs:nonce:1710872658811",
    "signers": [
      {
        "pubKey": "WEBAUTHN-a50102032620012158200df3845d4ad0f626a3c860715ad3d4bd7bbee03330aa32878d6baa045e98f64f2258206a93722f35f3d0692dc4c26703653498eae51816ffb7b70e4670b010103bd9eb",
        "scheme": "WebAuthn",
        "clist": [
          {
            "name": "n_eef68e581f767dd66c4d4c39ed922be944ede505.webauthn-wallet.GAS_PAYER",
            "args": [
              "c:bF51UeSqhrSjEET1yUWBYabDTfujlAZke4R70I4rrHc",
              {
                "int": 1
              },
              1
            ]
          },
          {
            "name": "n_eef68e581f767dd66c4d4c39ed922be944ede505.webauthn-wallet.GAS",
            "args": ["c:bF51UeSqhrSjEET1yUWBYabDTfujlAZke4R70I4rrHc"]
          },
          {
            "name": "n_eef68e581f767dd66c4d4c39ed922be944ede505.webauthn-wallet.TRANSFER",
            "args": [
              "c:bF51UeSqhrSjEET1yUWBYabDTfujlAZke4R70I4rrHc",
              "k:9cb650e653f563d782182a67b73a4d5d553aaf6f1c4928087bb7d91d59b8a227",
              {
                "decimal": "2.00000000000"
              }
            ]
          }
        ]
      }
    ],
    "meta": {
      "gasLimit": 2000,
      "gasPrice": 1e-7,
      "sender": "c:bF51UeSqhrSjEET1yUWBYabDTfujlAZke4R70I4rrHc",
      "ttl": 60000,
      "creationTime": 1710872658,
      "chainId": "1"
    },
    "networkId": "testnet04"
  },
  "hash": "6DGS9ML91o6S9BLgo_lBzLPkRZSb5RImCL06zjrbkD0",
  "sigs": [null]
}
```

> NOTE: `coin` is a non-upgradable contract which means that it will likely not
> be updated to accomodate `webauthn-wallet` accounts. This is a special case
> which is why the `webauthn-wallet` contract implements specific functions and
> capabilities that can be used in place of the corresponding versions in the
> `coin` contract. Other contracts should be implemented to be compatible with
> `webauthn-wallet` accounts by default.

### Step 2 - Send data to the SpireKey wallet

When you are finished creating the unsigned transaction, you can then send that
data along with a returnUrl to the wallet to handle the signing process and
navigate users back to your dApp. This information will be passed via url
parameters.

You will use the same host that you used to connect the account and navigate to
the sign page: https://chainweaver.kadena.io/sign

In the following table you can see what parameters are currently accepted by
SpireKey.

| Parameter    | Type    | Required | Description                                                                                                                                                                                                                                                                                                                                                                               |
| ------------ | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transaction  | string  | Required | A base64 encoded string of the unsigned transaction                                                                                                                                                                                                                                                                                                                                       |
| returnUrl    | string  | Required | The url, encoded as a uriComponent, that the wallet should redirect users to when they have signed the transaction                                                                                                                                                                                                                                                                        |
| translations | string  | Optional | This allows dApp developers to pass custom translations. You can read more about this in the Translations guide                                                                                                                                                                                                                                                                           |
| optimistic   | boolean | Optional | This allows dApps to optimistically move forward in their transaction flows without having to wait for the transaction to be confirmed on the blockchain. When this is enabled, `pendingTxIds` will be returned so that the dApp can keep track of the status of the submitted transactions and update the UI accordingly. Please see the docs for more information about how this works. |

Transactions can grow in size well beyond what is accepted in
`searchParameters`. To enable users to sign these transactions, you should send
the transaction parameters to the SpireKey endpoint using the anchor hashtag (#)
instead of the searchParameter question mark (?).

The following is an example of how you would construct the route:

```ts
// tx is the unsigned transaction from the previous step
const encodedTx = btoa(JSON.stringify(tx));

// We are using `encodeURIComponent` so that the return url is still readable
const encodedReturnUrl = encodeURIComponent(RETURN_URL);

// The url you need to navigate to sign and return the transaction
const sendTransactionUrl = `https://chainweaver.kadena.io/sign#transaction=${encodedTx}&returnUrl=${encodedReturnUrl}`;
```

Once you construct the route to the wallet with the required parameters, you can
navigate to the wallet to handle the signing.

### Step 3 - Getting your signed transaction from the SpireKey wallet

Once all signatures for a transaction have been successfully collected from the
wallet, the user will be navigated back to the returnUrl you provided and the
signed transaction as well as other optional parameters will be returned in the
url parameters. In the case that the transaction was not successfully signed,
the unsigned transaction will be returned in the url parameters.

| Parameter    | Type     | Required | Description                                                                                |
| ------------ | -------- | -------- | ------------------------------------------------------------------------------------------ |
| transaction  | string   | Required | A base64 encoded string of the signed or unsigned transaction                              |
| pendingTxIds | string[] | Optional | Pending transaction IDs that can be used to move forward in an optimistic flow application |

To verify that your transaction has been successfully signed, you can check the
`sigs` field in your transactions. If it has undefined signatures, then you will
not be able to proceed with submitting the transaction.

If the transaction has been successfully signed, it will be valid for the amount
of time specified as the value of `ttl` in the meta data used to construct the
transaction. During this time frame the dApp can choose perform a
`local/preflight=true` call to see if the transaction is valid and then send it
to be mined.

Once the transaction is submitted, you can poll for the transaction status
against the Chainweb Data API and deem the transaction successfully mined when
it reaches an appropriate confirmation depth.
