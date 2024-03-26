# Guide to Translate Capabilities for dApps

Your users will need to approve of transactions at some point in your dApp. When
that moment arises you would want your users to fully comprehend what they are
signing for. When asking a user for consent, translations can provide an
explicit way for you as a dApp developer to communicate the terms of your
interaction. In this guide you will learn how to effectively provide
translations for capabilities in a smart contract.

For example, when a user is asked to sign for a transfer of 100.0 KDA, without
any translations will be displayed as:

```pact
(coin.TRANSFER "sender" "receiver" 100.0)
```

For non-technical users this may not be clear enough to understand what they are
signing for. However imagine the same capability with translations:

> You are approving a transfer of up to 100.0 KDA to "receiver"

This is a lot clearer for the user to understand what they are signing for. If
the translations provided are not secured, a malicious actor could provide
translations to mislead the user. To prevent this from happening, the wallets
will verify the integrity of the translations before showing them to the user.
This means you as a dApp developer need to go through the process of registering
your translations with the smart contract. This guide will walk you through the
process of registering meta data and translation bundles with your smart
contract.

## Smart Contract translation bundle registration

Your users will be interacting with your smart contract. This smart contract is
the backbone describing the rules of engagement. Part of describing the rules of
engagement is to make sure all users involved understand the rules.

Kadena created Pact, a smart contract language, to write contracts that are more
human readable than other languages, however, we still want to further simplify
concepts for users who are just interacting with a dApp. In Pact, capabilities
are a form of abstraction that allows the smart contract to communicate the
required consent of a user. By providing more intuitive translations for these
capabilities and presenting them in categories, we can make it easier for the
user to understand what they are signing for.

### Meta data

Now that you understand the two types of capabilities, you can detail in which
category a capability belongs. To define these categories you need to define a
JSON object describing your smart contract. This JSON object starts with the
description of your smart contract on a general level and then delves into the
meta data of capabilities.

This JSON object will be stored outside of your smart contract. You'll have to
provide a way for the wallets to retrieve the raw meta data and translation
bundle. Both will have their uri stored along with the hash resulting from the
blake2b256 encoded hash of the JSON.

#### Granter Capabilities

The `granter` capabilities asks the user to consent of something leaving their
possession. Think of a user approving a transaction of up to 100.0 KDA.

When signing for capabilities the wallet will display the capabilities grouped
by `granter` and `acceptor` capabilities. A capability will be classified as a
`granter` capability by default, but should regardless be explicitly defined as
such when applicable. The rationale is that granting is more sensitive than
accepting in general.

In the following example, the `TRANSFER` capability is a `granter` capability.
The wallet will display the capability as part of the `granter` capabilities for
the user who is signing for this capability.

NOTE: The `name, module, description, hash` and `blessed` fields are fields that
currently are not used. They are already there to allow wallets to make use of
those fields in the future. For example to help a user understand the smart
contract with a explorer view.

```json
{
  ...,
  "capabilities": {
    "granter": [{ "name": "TRANSFER" }],
    "acceptor": []
  }
}
```

#### Acceptor Capabilities

The `acceptor` capabilities asks the user for consent to accept something to
come in their possession. Think of a user making an order and confirming the
product that they will receive.

You can also define an `acceptor` capability. For example when minting a NFT, we
could ask the user to sign for accepting this NFT. The wallet can display this
capability to signify the NFT coming in their possession, while the `TRANSFER`
will indicate the amount of KDA they need to pay.

For example, you are utilizing functionality from the `coin` contract and an NFT
contract to construct a transaction. Keep in mind that every smart contract will
have its own meta data and translations that will be retrieved by the Wallet
separately. The `MINT` capability you could define as such:

```json
{
  ...,
  "capabilities": {
    "granter": [],
    "acceptor": [{ "name": "MINT" }]
  }
}
```

With the provided meta data for the `My NFT` and `coin` contracts, the wallet
knows that `free.nft.MINT` is an `acceptor` capability and `coin.TRANSFER` is a
`granting` capability.

#### Multiple roles for a single capability

For some capabilities you might want to define both `granter` and `acceptor`.
For example when ordering a product, you might want to define the `ORDER`
capability where the `customer` will take on the role of `acceptor` and the
`merchant` will take on the role of `granter`. However the wallet needs to
understand how to assign those roles to the signers accordingly. This requires
the capability to include both the `acceptor` and `granter` to be part of the
`capability params`.

For example the `ORDER` capability could be defined as such:

```pact
(ORDER "order-id" "customer-account" "merchant-account")
```

The wallet will try to identify if the signer is associated with the `customer`
or with the `merchant` by comparing the provided `customer-account` and
`merchant-account` with the accounts stored in the wallet. This allows the
wallet to display the capability in the correct category and looks up the
translation for the correct role.

```json
{
  "name": "Delivery",
  "module": "user.delivery",
  "description": "Delivery smart contract that governs delivery of products.",
  "hash": "M1gabakqkEi_1N8dRKt4z5lEv1kuC_nxLTnyDCuZIK0",
  "blessed": [],
  "capabilities": {
    "granter": [
      {
        "name": "READY_FOR_DELIVERY"
      },
      {
        "name": "ORDER_LINE_ID",
        "argumentIndex": 2
      }
    ],
    "acceptor": [
      {
        "name": "ORDER_LINE_ID",
        "argumentIndex": 1
      }
    ]
  }
}
```

### Translation bundle

You can define how the capabilities are displayed in the wallet by providing a
translation bundle. The translation bundle is a JSON object that contains the
translations for capabilities. Each entry for a capability should contain either
a `granter` or `acceptor` key, but can have both defined.

Each entry can provide for the following information:

| key   | type   | description                               |
| :---- | :----- | :---------------------------------------- |
| title | string | The title used in the capability template |
| value | string | The value used in the capability template |
| image | string | The image used in the capability template |

You can imagine the translation template defined in a wallet as such:

```html
<div class="capability">
  <div class="image"><img src="{{image}}" alt="{{title + value}}" /></div>
  <div class="title">{{title}}</div>
  <div class="value">{{value}}</div>
</div>
```

The arguments provided to the capability can be accessed by the string `{1}`,
`{2}`, `{3}`, etc. The wallet will replace these strings with the arguments
provided to the capability. You can then proceed to define the translations for
`TRANSFER`, `MINT` and `ORDER` as:

```json
// coin module
{
  ...,
  "coin.TRANSFER": {
    "granter": {
      "title": "You are sending KDA to {1}",
      "value": "{2} KDA",
      "image": "https://example.com/transfer.png"
    }
  },
  ...
},
// free.nft module
{
  ...,
  "free.nft.MINT": {
    "acceptor": {
      "title": "You are receiving a NFT",
      "value": "NFT ID: {0}",
      "image": "https://example.com/mint.png"
    }
  }
},
// user.delivery module
{
  ...,
  "user.delivery.ORDER": {
    "acceptor": {
      "title": "You are ordering a product",
      "value": "Order ID: {0}",
      "image": "https://example.com/order.png"
    },
    "granter": {
      "title": "You are fulfilling an order",
      "value": "Order ID: {0}",
      "image": "https://example.com/fulfill.png"
    }
  }
  ...,
}
```

The wallet will fetch all translation bundles registered with the smart contract
separately. This means dApp developers only need to make sure the translations
are registered with the smart contract correctly. The wallet will then take over
the responsibility of fetching the translations and displaying the capabilities
in the user's preferred language.

### Registering the translation bundle and meta data

You can register the translation bundle and meta data as part of your smart
contract by implementing: `translatable` and `meta` in your smart contract:

```pact
(interface translatable
  (defschema translation
    bundle-hash : string
    uri         : string
  )
  (defun get-translation:object{translation}(country:string locale:string)
    @doc "Returns the hash and uri associated to the requested bundle"
  )
)
(interface meta
  (defschema meta-data
    meta-hash : string
    uri       : string
  )
  (defun get-meta:object{meta-data}()
    @doc "Returns the hash and uri associated to the meta data"
  )
)
```

After your smart contract has the `translatable` and `meta` interfaces
implemented, the wallet will have all the necessary information to display the
capabilities in the user's preferred language, given you have provided a
translation for that language. This includes dApps that make use of your smart
contract that are not developed by you or smart contracts embedding your smart
contract.

#### Translation bundle registration

You first need to implement the `translatable` interface in your smart contract.
You will need to create a table holding the translation bundle hashes and URIs.
Wallets will use the `get-translation` function to retrieve the translation
bundle and verify the hash with the one computed from the translation bundle.

```pact
(interface translatable
  (defschema translation
    bundle-hash : string
    uri         : string
  )
  (defun get-translation:object{translation}(country:string locale:string)
    @doc "Returns the hash and uri associated to the requested bundle"
  )
)
```

In pseudo code the wallet will do the following:

```js
var translation = getTranslation('us', 'en');
var bundle = getBundle(translation.uri);
if (blake2b256(JSON.stringify(bundle)) != translation['bundle-hash'])
  throw 'Invalid translation bundle';
```

In your smart contract you will have to provide a way to store the bundles. Here
is an example implementation:

```pact
(module my-module G
  (defcap G() (enforce false "Not upgradable module"))
  (implements translatable)
  (deftable translation-table:{translatable.translation-schema})
  (defun get-translation:object{translatable.translation-schema}(country:string locale:string)
    (read translation-table (format "{}_{}" [country locale]))
  )

  ; register or update bundle
  (defun register-bundle (country:string locale:string bundle-hash:string uri:string)
    (write translation-table (format "{}_{}" [country locale])
      { 'bundle-hash : bundle-hash
      , 'uri         : uri
      }
    )
  )
)
```

#### Meta data registration

You also need to implement the `meta` interface in your smart contract. The
wallet will similarly to the translation bundle, get the meta data and verify
the integrity of the data with the hash provided.

```pact
(interface meta
  (defschema meta-data
    meta-hash : string
    uri       : string
  )
  (defun get-meta:object{meta-data}()
    @doc "Returns the hash and uri associated to the meta data"
  )
)
```

In pseudo code the wallet will do the following:

```js
var meta = getMeta();
var data = getMetaData(meta.uri);
if (blake2b256(JSON.stringify(data)) != meta['meta-hash'])
  throw 'Invalid meta data';
```

In your smart contract you will have to provide a way for the wallet to retrieve
the meta data. Here is an example implementation:

```pact
(module my-module G
  (defcap G() (enforce false "Not upgradable module"))
  (implements meta)

  ; compute the hash blake2b256(JSON.stringify(meta-data))
  (defconst meta-data "M1gabakqkEi_1N8dRKt4z5lEv1kuC_nxLTnyDCuZIK0"
    "The hash of the JSON object describing the meta data"
  )
  (defconst meta-uri "https://example.com/meta.json"
    "The URI to retrieve the meta data"
  )
  (defun get-meta:object{meta.meta-data}()
    { 'meta-hash : meta-data
    , 'uri       : meta-uri
    }
  )
)
```
