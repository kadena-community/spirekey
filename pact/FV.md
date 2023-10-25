# Using Formal Verification to lay out a blueprint

I've written the L2 contract over 5 months ago. In those 5 months I've learned a
lot about pact and Formal Verification. The L2 contract was a implemented
minimally, only supporting the minimal features necessary for the PoC.
We want to extrapolate new usecases based on the learnings and for that the L2
contract's state was lacking, in both tests and functionality.

I wanted to apply what I've learned of FV and use it to verify my L2 contract.
I had a choice, apply it on the existing contract, or rewrite it from scratch.

## Applying Formal Verification as an after thought

What I've noticed is that applying Formal Verification as an after though is a
very difficult task. At least in the way Formal Verification prints out the
invalidating models now. A [feature request](https://github.com/kadena-io/pact/issues/1297)
has been made that potentially will make this feat easier.

The main reason why it's difficult to apply Formal Verification as an after thought
is that you get all invalidating models thrown at your at once. Making it a very
overwhelming task to find the code that is invalidating your model.

## Blueprint

With that attempt out of the way, I decided to rewrite the smart contract by first
defining a blueprint. In this case the blue print consists of 3 methods:

- deposit
- transfer
- withdraw

With this blueprint I started to refine my model using Formal Verification. So
lets explore how we can refine the deposit method.

### Translating Deposit into properties

- The account locking up funds will be referred to as `sender`.
- The account receiving funds will be referred to as `receiver`.
- The account holding all funds in circulation on the L2 will be referred to as `ESCROW`.
- The amount being deposited wiill be referred to as `amount`.
- The keyset governing the the l2 contract will be referred to as `GOVERNANCE`

In this L2 solution we lock up funds on the L1, to make those available
on the L2. This is to ensure that no tokens will ever get created via the
L2. This solution also promotes the use of `principal` accounts. This helps
users protect their accounts from squatting. Further more the tokens can
only be claimed on the L2 when a GOVERNANCE signs for it.

So let's break those statements up in more detail:

- the `GOVERNANCE` needs to sign for the claim
- `sender` transfers `amount` to `ESCROW` on the L1
- if `receiver` exists on L2, the `amount` will be added to the balance
- if `receiver` does not exist, a new account will be created and the
  amount will be added to the balance
- every account needs to be a valid principal account

Now let's translate those statements into `properties`:

```pact
@model [
  ; the `GOVERNANCE` needs to sign for the claim
  (property (authorized-by L2_KS_NAME))
  ; every account needs to be a valid principal account
  (property (is-principal sender))
  ; `sender` transfers `amount` to `ESCROW` on the L1
  (property (= (- amount) (cell-delta coin-table 'balance sender)))
  (property (= amount (cell-delta coin-table 'balance ESCROW_ID)))
  ; every account needs to be a valid principal account
  (property (is-principal receiver))
  ; if `receiver` exists on L2, the `amount` will be added to the balance
  ; if `receiver` does not exist, a new account will be created and the
  ; amount will be added to the balance
  (property (= amount (cell-delta l2-coin-table 'balance receiver)))
]
```

### Verification

With those properties in place our requirements will be verified. For example
if we were to "recreate" a new account every time we claim tokens, we would
be presented with:

```
pact/l2-coin.pact:201:16:OutputFailure: Invalidating model found in n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.l2.claim-deposit
  Program trace:
    entering function n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.l2.claim-deposit with arguments
      receiver = "internal-principal-"
      guard = -2
      amount = 0.000000000001

      entering capability n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.l2.n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.l2.GOVERNANCE
        satisfied guard named 'n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.l2-keyset
        returning with True

      read { balance: 0.000000000001, guard: -2 } from l2-coin-table at key "internal-principal-" succeeds
      destructuring object
        receiver-balance := 0.000000000001
        receiver-guard := -2
        entering function n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.l2.enforce-unit with argument
          amount = 0.000000000001

          entering function coin.enforce-unit with argument
            amount = 0.000000000001

            satisfied assertion: (= (floor amount MINIMUM_PRECISION)
         amount)

            returning with True

          returning with True

        satisfied assertion: (> amount 0.0)
        satisfied assertion: (= receiver-guard guard)
        satisfied assertion: (validate-principal guard receiver)
        write l2-coin-table at key "internal-principal-" with { balance: 0.000000000001, guard: -2 } succeeds
      returning with "Write succeeded"
```

Unfortunately it doesn't display the exact invalidating property to us yet, but
at the very least we know that our requirements have not been met.
