---
KIP: '00XX'
Title: EvoConnect
Author: Andy Tang @EnoF
Status: Draft
Type: Standard
Category: Interface
Created: 2024-01-22
---

# Abstract

We propose to use a different way for dApps to connect with Wallets using
existing and proven Web2 Standards in order to improve the usability for end
users interacting with dApps and Wallets.

# Motivation

As of writing there are several ways to connect a dApp to a Wallet in order to
sign for transactions. We believe that the available setups do not provide for
the seamless connection we ambition for.

On the Web2 space there are well established techniques to provide authorization
over multiple domains. One well known and widely used technique is OAuth. Users
use this often in a seemless way and often provides for a lower level of entry
in the registration process.

Our belief is that the wallets could serve as the new decentralized hub of
authorization and authentication that centralized services like Google, Twitter
and Facebook offer now. Utilizing a Wallet with this proposed solution should
reduce the friction for users to interact with the services offered and increase
conversion rate.

# Specifications

Wallets and dApps will communicate with the end user's browser via `https`. All
the information will be relayed via the end user. In this specification there
will be the following points of interest:

1. Login token
2. Signers information
3. Signatures

## Login Token

In tradition OAuth applications the token issued is scoped with access rights.
This could include not only reading resources, but also creating, updating or
even deleting resources. For the purpose of this specification we recommend the
login token to only be used to read incensitive information.

In general information stored on the blockchain is public. So if the information
that is displayed is stored on the blockchain, it should pose no risk. If this
login token is used to display information retrieved from a private database,
then it should be used with caution. This specification has no elaborate
implementation with session or token management.

### Implementation

For a user to login we could create a transaction for the user to sign. This
could work for traditional accounts (`k:accounts` or `w:accounts`) or even
`c:accounts` guarded by a `WebAuthn Guard` [KIP-0023](./KIP-0023.md).

When a user visits a dApp, the dApp can send the user to their wallet. When
sending the user to their wallet the following information should be provided
for the wallet:

| param     | type   | required | comment                                                                               |
| :-------- | :----- | :------- | :------------------------------------------------------------------------------------ |
| returnUrl | string | - [x]    | This is the url the wallet should redirect the end user to after confirming the login |
