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
