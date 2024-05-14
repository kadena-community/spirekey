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
the `pendingTxs` returned or disable optimistic mode.
