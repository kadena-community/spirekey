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
  const { transactions, isReady } = await sign(
    [tx],
    [
      {
        accountName: account.accountName,
        networkId: account.networkId,
        chainIds: account.chainIds,
        requestedFungibles: [
          {
            fungible: 'coin',
            amount: amount, // The requested amount
          },
        ],
      },
    ],
  );
  await isReady();

  // submit your tx with @kadena/client
  transactions.map(async (tx) => {
    const res = await client.submit(tx);
    client.pollOne(res);
  });
};
```

## `initSpireKey(config?: InitConfig)`

The `initSpireKey` function prepares the necesarry components to be loaded on
the background. This allows for the component to be ready the moment you ask the
user to connect and/or sign without needing them to wait for the component to
load. There is an optional `config` you can pass along to configure a different
host on where SpireKey is hosted. When omitted it will use
`https://spirekey.kadena.io`.

If you do want to use a different host, you can provide it via the config:

### InitConfig

| key     | type   |
| :------ | :----- |
| hostUrl | string |

## `connect(networkId: string, chainId: ChainId)`

To connect an account you need to provide the `networkId` and `chainId`.
SpireKey will then take care of making the account available on that `networkId`
and `chainId`. When the account doesn't exist in that combination, SpireKey will
submit transactions on the background to prepare the account. If your dApp
relies on the account existing on the provided `networkId` and `chainId`
combination, you can wait for the account to be ready before continuing.

```ts
import { connect } from '@kadena/spirekey-sdk';

const someHandler = async () => {
  const account = await connect('testnet04', '5');
  // if you want to know if the account is ready for submitting transactions
  // NOTE: you can in general start constructing your transaction before an account is ready
  await account.isReady();
};
```

## `sign(transactionList: IUnsignedCommand[], accounts?: Account[])`

You can sign one or more transactions using the `sign` function. Additionally if
your transaction depends on the account to be ready, you can convieniently
provide a list of accounts that should be ready. The sign function will return a
`isReady` function which conviently waits for all provided accounts to be ready.

```ts
import { connect } from '@kadena/spirekey-sdk';

const someHandles = async () => {
  const account = yourConnectedAccount;
  const tx = yourTransaction;

  // if you have multiple tx's to sign, you can provide them all at once
  // provide the accounts in the optional array if you want to wait for
  // the account to be ready before submitting
  const { transactions, isReady } = await sign(
    [tx],
    [
      {
        accountName: account.accountName,
        networkId: account.networkId,
        chainIds: account.chainIds,
        requestedFungibles: [
          {
            fungible: 'coin',
            amount: amount, // The requested amount
          },
        ],
      },
    ],
  );
  await isReady();

  // submit your tx with @kadena/client
  transactions.map(async (tx) => {
    const res = await client.submit(tx);
    client.pollOne(res);
  });
};
```
