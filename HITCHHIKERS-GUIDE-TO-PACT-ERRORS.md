# Hitchhiker's Guide to Pact Errors

So you find yourself lost after submitting your transaction to Chainweb. What to
do next? The errors provided by Chainweb/Pact are not always instructive on how
to proceed. However they do have the information you need to resolve the error
you encountered. Here are some tips to help resolve your errors.

## Check the error message

First step is to look at the error message:

```
{
  result: {
    error: {
      type: "TxFailure",
      message: "Look at this message" <-----
    },
    status: "failure"
  }
}
```

The message you see there ranges from error messages produced by syntax errors
all the way down to custom thrown error messages.

### Custom message

You see a message that does not seem like a `pact native` error. Copy the
message and search your smart contract for that same message. You should be
guided to an enforce statement that contains your message. It's likely that
you've not met all conditions within that enforce statement.

### Pact parsing error: Error in $.signers[0].clist[0].name: ".": not enough input

You forgot to add the namespace of the capability you tried to sign for. Even
the contracts deployed on root contains at least the module name before the
capability. So even for `coin` you would need to add it as `coin.TRANSFER`.

It's likely you will be using a capability from a different namespace, like
`free` or `n_eef68e581f767dd66c4d4c39ed922be944ede505`. These should always be
added before the module name.

### Error: Keyset failure ...

There are two main reasons to look for when seeing this error.

1. You forgot to sign for this keyset
2. You scoped your signature and did not include a required Capability

Forgetting to sign for a keyset can be more complicated than on first sight. A
keyset could maybe have a requirement of multiple keys to be signed. So make
sure that the `predicate` of that keyset is met.

You more likely have scoped your signature to a Capability and forgot one or
more other Capabilities to be signed. This is solved by looking up the smart
contract's implementation of the function. Follow the function till you see a
`with-capability` and make sure to add that Capability into scope.

### Capability not in scope

You tried to execute a function that does not have a capability in scope. This
is likely an advanced usecase where you want to access an account or row that is
guarded by a smart contract elsewhere. You likely need to execute a different
function that will execute the function you intended to execute.
