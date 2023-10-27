# WebAuthn

## Abstract

We propose to use WebAuthn signatures as an alternative option to the current
ED25519 signatures to allow users to approve for transactions processed through
Chainweb Node and Pact smart contracts.

## Motivation

WebAuthn allows for users to use a hardware powered device to store keypairs securely.
Users will be able to interact with those stored keypairs only by initiating a sign
request from the registered web domain. The private key never leaves the device
and the user never enters a password. This brings the user more security and convenience
simultaneously.

In comparison to current wallets, the wallet developers have no access to the
private keys. The user does not have to write down their mnemonics or even enter
their password to decrypt their privatekeys.

## Registration flow

```mermaid
sequenceDiagram
  User->>+WalletA.com: I'd like to create an account
  WalletA.com-->>-User: Under what alias would you like to register an account?
  User->>+WalletA.com: I'd like to use "Alice"
  WalletA.com-->>+WebAuthn(SC): What is the "c:account" for "Alice"?
  WebAuthn(SC)-->>-WalletA.com: That would be "c:capabilityguardforalice"
  WalletA.com-->>+Phone: Please give me a public key for Alice, c:capabilityguardforalice
  Phone-->>+User: Please approve this request
  User-->>-Phone: I approve this request
  Phone-->>-WalletA.com: Here is the public key: abc000
  WalletA.com-->>+Phone: Here is the transaction to register, please sign
  Phone-->>+User: Please approve this transaction
  User-->>-Phone: I approve this transaction
  Phone-->>-WalletA.com: Here is the signature for the transaction
  WalletA.com-->>+WebAuthn(SC): Please register "Alice" with this public key
  WebAuthn(SC)-->>+Fungible(SC): Create an account for "c:capabilityguardforalice"

```

## Registration flow (second wallet)

```mermaid
sequenceDiagram
  User->>+WalletB.com: I'd like to add this wallet to an existing account
  WalletB.com-->>-User: What is the alis of the account?
  User->>+WalletB.com: The alias is "Alice"
  WalletB.com-->>+WebAuthn(SC): What is the public key of the previously registered device for "Alice"?
  WebAuthn(SC)-->>-WalletB.com: That would be "abc000"
  WalletB.com-->>+Phone: Please give me a public key for Alice, c:capabilityguardforalice
  Phone-->>+User: Please approve this request
  User-->>-Phone: I approve this request
  Phone-->>-WalletB.com: Here is the public key: fff000
  WalletB.com-->>+Phone: Here is the transaction to register, please sign
  Phone-->+User: Please approve this transaction
  User-->>-Phone: I approve this transaction
  Phone-->>-WalletB.com: Here is the signature for the transaction
  WalletB.com-->>+WalletA.com: Please approve this registration
  WalletA.com-->>+User: WalletB wants to register for "Alice", do you wish to proceed?
  User-->>-WalletA.com: I would like to proceed
  WalletA.com-->>+Phone: Here is the transaction to register, please sign
  Phone-->>+User: Please approve this transaction
  User-->>-Phone: I approve this transaction
  WalletA.com-->>+WebAuthn(SC): Please add WalletB.com as wallet for this account
  WebAuthn(SC)-->>+Fungible(SC): Update "Alice" to have "WalletA" and "WalletB"
```

## Sign for transaction (dApp)

```mermaid
sequenceDiagram
  User-->>+dApp: Hi I'm "Alice"
  dApp-->>-User: What wallet would like to use to identify yourself with?
  User-->>+dApp: I'd like to use WalletA.com
  dApp-->>-User: Please provide me account information
  User-->>+WalletA.com: Please provide my account info
  WalletA.com-->>-User: Here is your info: abc00, c:capabilityguardforalice
  User-->>+dApp: Here are my details
  User-->>+dApp: I'd like to buy this product
  dApp-->>-User: Here is the transaction to order the product
  User-->>+WalletA.com: Please sign for this transaction
  WalletA.com-->>+Phone: Please provide the signature for this txhash
  WalletA.com-->>-User: Here is the tx with signature
  User-->>+dApp: Here is the tx with signature
  dApp-->>+Chainweaver: Submitting tx
```
