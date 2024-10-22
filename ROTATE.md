# Rotating keysets

The `coin` fungible used to allow accounts to `rotate` their keysets. The
ability to `rotate` keysets has many merits, but was overshadowed by a looming
flaw. The potential to end up in a situation where funds won't be redeemable
after a cross-chain transfer is a very threatening situation.

The smart contracts for SpireKey were written when `coin v6` was on the rise.
`coin v6` removed the ability to rotate keysets on principal accounts to prevent
users from ending up in the aforementioned situation. However SpireKey needs the
ability for users to add more devices to an account, without changing their
account name. It would be incredibly cumbersome for users to migrate all their
assets, just because they switched Passkey Providers.

For this reason SpireKey introduces an abstraction on top of `fungibles`, to
reintroduce the ability to rotate keysets, while preventing the aforementioned
situation. To do this we put the following conditions for creating accounts:

- When creating an account, the account name must be equal to the principal of a
  guard
- When an account has rotated, the rotated state must be transferable to another
  chain

To illustrate what is allowed and what not, here are a few examples:

```pact
; Create an account as usual
(coin.create-account (create-principal (read-ks 'ks)) (read-ks 'ks))

; This will fail as the validate principal check will fail
(coin.create-account (create-principal (read-ks 'ks-a)) (read-ks 'ks-b))

; This would be allowed in the proposal
(coin.rotate (create-principal (read-ks 'ks)) (read-ks 'ks-b))

; This would need to be added, where the entire state of the account
; will be copied via defpact to another chain and requires the user
; to sign on the origin chain
(coin.copy-account (create-principal (read-ks 'ks)) "5")

; A transfer create where the account has rotated the keyset
; should continue to work, but if the account didn't exist yet
; the account should be created as long as the arguments
; pass the `validate-principal`
(coin.transfer-create (create-principal (read-ks 'ks)) (read-ks 'ks))

; In the scenario where the sender does not have any way to reason
; about the initial keyset, they could opt to send the new keyset
; However, this keyset should only serve as a check during retrieval
; of funds and never create an account if it does not pass the
; `validate-principal`. The receiver will need to copy over the
; guard from the origin chain to the target chain to match and
; proceed with the mint
(coin.crosschain-transfer
  (create-principal (read-ks 'ks-a))
  (create-principal (read-ks 'ks-b))
  (read-ks 'ks-c)
  1.0
  "5"
)
```

## Why is this relevant?

SpireKey has introduced multiple smart contracts to get the behavior described
above available in a user friendly way, hidden behind the SpireKey wallet.
However it's starting to show it's limitations when another smart contract
wishes to `transfer` within their smart contract. Think of purchasing a NFT. The
way SpireKey was designed with the additional smart contract on top of `coin`,
it made it very impractical for other contracts to make use of an account
governed by SpireKey contracts. Those accounts are guarded by a
`capability guard`. Which means that only the smart contract issuing the
`capability guard` can validate the guard. Once `coin` reintroduces `rotate`,
the `capability guard` can be replaced by a `keyset` allowing any other contract
to validate the `guard`. This means that we can get rid of all the SpireKey
smart contracts, resulting in less audits required, less security risks and less
code to maintain.

## Temporary solution

Regardless if the above proposal will be accepted, Eileen and I have thought of
a intermediate solution that would bring similar capabilities with the tools we
have available now. We intend to use `r:accounts`, which are principal accounts
based on `reference keysets`. This solution satisfies the ability to rotate, but
if done carelessly, will result in different vulnerabilities. Most users that
have created keyset references have done so via the `free` or `user` namespace.
These references are able to be recreated using a different keyset on a
different chain. Resulting in users sending tokens to an account with the same
name, but owned by a different user.

The solution to this problem is `principal namespaces`. However setting this up
is cumbersome and far from ideal. SpireKey made it possible to create an account
by simply providing your public key. It would be a shame to lose this incredible
experience. Therefore we came up with the a new idea to initiate this namespace:

```pact
(let* (
  (ns-name (ns.create-principal-namespace (read-keyset 'ns-keyset)))
  (ks-ref-name (format "{}.{}" [ns-name 'ns-keyset]))
)
  (define-namespace
    ns-name
    (read-keyset 'ns-keyset )
    (read-keyset 'ns-keyset )
  )
  (namespace ns-name)
  (define-keyset ks-ref-name
    (read-keyset 'ns-keyset)
  )
  (let (
    (account (create-principal (keyset-ref-guard ks-ref-name)))
  )
    (coin.create-account
      account
      (keyset-ref-guard ks-ref-name)
    )
    (n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.spirekey.add-device-pair
      account
      coin
      { 'guard : (read-keyset 'ns-keyset)
      , 'credential-id : "credential-id"
      , 'hostname : "https://chainweaver.kadena.io"
      , 'device-type : "device-type"
      , 'color : "#hexcolor"
      }
    )
  )
)
```

With the above code, you have created a new `principal namespace`, but the
provided `keyset` needs to have signed for this transaction unrestricted. To
avoid having users to sign for the creation of their accounts, we intend to
create a `temporary keypair`. This `temporary keypair` will be created client
side during creation of the account and added to the `keyset` along with the
`public key` retrieved via `passkey` with a `keys-any` predicate, forming the
`ns-keyset`. The `public key` retrieved via `passkey` will be forming the
`webauthn-keyset`. After creation of the account, the `temporary keypair` can be
safely forgotten and never to be retrieved again as the user can rotate, or even
recreate the same keyset reference on another chain using their `passkey`.

The `add-credential` is a way for wallets to know what `credential-id` to use in
order to ask a user to sign. The additional meta data is purely so a user can
recognize it more easily in the future for maintenance reasons.

## Burst creation

To avoid users from having to sign unrestricted everytime they interact on a new
chain, we suggest to create the accounts on all `20 chains` in one go with the
help of the `temporary keypair`. This will prevent the cases where an user loses
access to their initial device which prevents them from creating their account
on new chains.

## Final thought

The beauty of this temporary solution is that if the proposal is accepted and
`coin` will accept keyset `rotation` and `copy`, the need of burst creation will
be removed and the need of setting up a `principal namespace` will be removed.
Simplifying the solution and having less chance for a user to lose the ability
to recreate their account on a new chain. The downside is that users will be
encouraged to move to the new account structure afterwards, causing potential
migration pain.
