# SpireKey SDK

The SpireKey SDK allows your dApp to seamlessly integrate with SpireKey.

## Quick start

Install the sdk with:

```
# yarn add @kadena/spirekey-sdk
# npm i @kadena/spirekey-sdk
pnpm add @kadena/spirekey-sdk
```

After your app has loaded, initialize the SDK:

```ts
import { initSpireKey } from '@kadena/spirekey-sdk';

initSpireKey();
```

To connect an account to your dApp:

```ts
import { connect } from '@kadena/spirekey-sdk';

const someHandler = async () => {
  const account = await connect('testnet04', '5');
  // if you want to know if the account is ready for submitting transactions
  // NOTE: you can in general start constructing your transaction before an account is ready
  await account.isReady();
};
```

To sign for an transaction:

```ts
import { connect } from '@kadena/spirekey-sdk';

const someHandles = async () => {
  const account = yourConnectedAccount;
  const tx = yourTransaction;

  // if you have multiple tx's to sign, you can provide them all at once
  // provide the accounts in the optional array if you want to wait for
  // the account to be ready before submitting
  const { transactions, isReady } = await sign([tx], [account]);
  await isReady();

  // submit your tx with @kadena/client
  transactions.map(async (tx) => {
    const res = await client.submit(tx);
    client.pollOne(res);
  });
};
```
