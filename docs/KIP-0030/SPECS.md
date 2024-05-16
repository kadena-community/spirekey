# SpireKey Specifications

To quickly get started with SpireKey you need to enable your dApp to:

- connect to a SpireKey account
- request a signature of a SpireKey account

## Connect to a SpireKey account

From your dApp initate a `GET` request to
[https://spirekey.kadena.io/connect](https://spirekey.kadena.io/connect). The
`GET` request expects you to provide the following search parameters:

| parameter  | type     | description                                                             |
| :--------- | :------- | :---------------------------------------------------------------------- |
| returnUrl  | string   | The url SpireKey should send the user to after connecting their account |
| networkId  | string   | The network id the transaction will be submitted on                     |
| chainId    | string   | The chain id the transaction will be submitted on                       |
| reason     | string?  | The reason a user is requested to connect their account to your dApp    |
| optimistic | boolean? | If set to `false` SpireKey will disable optimistic mode                 |

### Onboarding

Users redirected to
[https://spirekey.kadena.io/connect](https://spirekey.kadena.io/connect) will be
guided through the onboarding in case the user has no existing account yet. As a
dApp developer you can delegate account creation to the SpireKey wallet. In most
cases a dApp does not need to wait for an account to be created before preparing
the transaction, all you really need is the public key that will sign for your
transaction. SpireKey will therefore by default operate in optimistic mode.

### Optimistic mode

SpireKey will redirect users back to the dApp as soon as the transaction to
create an account has been submitted. In case your dApp relies on an account
being created prior to interacting with your dApp, you can either make use of
the `pendingTxIds` returned in the `user` object or disable optimistic mode.

### Return value

After a user has connected their account in SpireKey to use in the dApp, user
will be redirected to the provided `returnUrl`. As part of the redirection
SpireKey will append a `user` in the `searchParameters`. This object describes
information you can use to address the user or to prepare a transaction.

#### User

| parameter    | type         | description                                                              |
| :----------- | :----------- | :----------------------------------------------------------------------- |
| alias        | string       | The alias for the account only relevant for the user as display name     |
| accountName  | string       | The `c:account` a user has connected to the dApp                         |
| pendingTxIds | string[]     | An array of pending transactions related to account creation/maintenance |
| credentials  | Credential[] | See [Credential](#credential)                                            |

#### Credential

Every account will have 1 or more credentials returned when connected. The
amount of credentials do not have to match the amount of credentials known on
the blockchain. The credentials returned are the credentials the user wishes to
use to perform the transaction with. When multiple credentials are returned, you
should prepare the transaction with all credentials signing for the same
relevant `capabilities`.

| parameter | type   | description                               |
| :-------- | :----- | :---------------------------------------- |
| type      | string | Can be `WebAuthn` or `ED25519`            |
| publicKey | string | The public key related to this account    |
| id        | string | The credential id related to this account |

## Signing

Prepare your transaction for the user to sign. The credentials included in the
[connect response](#connect-to-a-spirekey-account) are the public keys you
should use to construct your transaction. When your transaction is ready to be
signed, you need to `base64` encode the stringified JSON of the transaction. To
ensure your transaction can be send over to the SpireKey endpoint, you need to
add your `searchParameters` not behind the traditional `?`, but as part of the
`#`. So an example request could look like:
`https://spirekey.kadena.io/sign#transaction=encodedTx&returnUrl=www.mydapp.com`

| parameter   | type   | description                                              |
| :---------- | :----- | :------------------------------------------------------- |
| transaction | string | `base64` encoded JSON stringified transaction object     |
| returnUrl   | string | The url the user needs to be redirected to after signing |
