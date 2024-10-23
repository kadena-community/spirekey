# SpireKey SDK

The SpireKey SDK allows your dApp to seamlessly integrate with SpireKey.

## Quick start

Install the sdk with:

```sh
# yarn add @kadena/spirekey-sdk
# npm i @kadena/spirekey-sdk
pnpm add @kadena/spirekey-sdk
```

Connect an account to your dApp:

```ts
import { connect } from '@kadena/spirekey-sdk';

const someHandler = async () => {
  try {
    const account = await connect('testnet04', '5');
  } catch (error) {
    console.warn('User canceled signin', error);
  }
  // if you want to know if the account is ready for submitting transactions
  // NOTE: you can in general start constructing your transaction before an account is ready
  await account.isReady();
};
```

Sign for an transaction:

```ts
import { connect } from '@kadena/spirekey-sdk';

const someHandler = async () => {
  const account = yourConnectedAccount;
  const tx = yourTransaction;

  try {
    // if you have multiple tx's to sign, you can provide them all at once
    // provide the accounts in the optional array if you want to wait for
    // the account to be ready before submitting
    const { transactions, isReady } = await sign(
      [tx],
      // this array is optional and can be omitted
      [
        {
          accountName: account.accountName,
          networkId: account.networkId,
          chainIds: account.chainIds,
          requestedFungibles: [
            {
              fungible: 'coin',
              amount: amount, // The requested amount
              target: '5', // Optional: The chainId to target
            },
          ],
        },
      ],
    );
  } catch (error) {
    console.warn('User canceled signing');
  }

  await isReady();

  // submit your tx with @kadena/client
  transactions.map(async (tx) => {
    const res = await client.submit(tx);
    client.pollOne(res);
  });
};
```

## `connect(networkId: string, chainId: ChainId)`

To connect an account you need to provide the `networkId` and `chainId`.
SpireKey will then take care of making the account available on that `networkId`
and `chainId`. If your dApp relies on the account existing on the provided
`networkId` and `chainId` combination, you can wait for the account to be ready
before continuing.

```ts
import { connect } from '@kadena/spirekey-sdk';

const someHandler = async () => {
  try {
    const account = await connect('testnet04', '5');
  } catch (error) {
    console.warn('User canceled signin', error);
  }
  // if you want to know if the account is ready for submitting transactions
  // NOTE: you can in general start constructing your transaction before an account is ready
  await account.isReady();
};
```

## `sign(transactionList: IUnsignedCommand[], accounts?: Account[])`

You can sign one or more transactions using the `sign` function. Additionally if
your dApp requires the user(s) to have fungible tokens available for the
transaction, you can provide an array with the required fungible tokens
requirements. SpireKey will then prepare the account to have the tokens
transfered to the chain your dApp operates on and allow your dApp to be notified
when the transaction is ready.

```ts
import { connect } from '@kadena/spirekey-sdk';

const someHandler = async () => {
  const account = yourConnectedAccount;
  const tx = yourTransaction;

  // if you have multiple tx's to sign, you can provide them all at once
  // provide the accounts in the optional array if you want to wait for
  // the account to be ready before submitting
  const { transactions, isReady } = await sign(
    [tx],
    // this array is optional and can be omitted
    [
      {
        accountName: account.accountName,
        networkId: account.networkId,
        chainIds: account.chainIds,
        requestedFungibles: [
          {
            fungible: 'coin',
            amount: amount, // The requested amount
            target: '5', // Optional: The chainId to target
          },
        ],
      },
    ],
  );
  // Wait for the transactions SpireKey has prepared before submitting
  await isReady();

  // submit your tx with @kadena/client
  transactions.map(async (tx) => {
    const res = await client.submit(tx);
    client.pollOne(res);
  });
};
```

## `initSpireKey(config?: InitConfig)`

The `initSpireKey` function is optional and can be used to configure the SDK to
target a different wallet using a `config` object. When omitted the SDK will
will use `https://chainweaver.kadena.io`.

If you do want to use a different host, you can provide it via the config:

### InitConfig

| key     | type   |
| :------ | :----- |
| hostUrl | string |

## Terms and Conditions

You are not required to accept this License, since you have not signed it.
However, nothing else grants you permission to modify or distribute the Program
or its derivative works. These actions are prohibited by law if you do not
accept this License. Therefore, by modifying or distributing the Program (or any
work based on the Program), you indicate your acceptance of this License to do
so, and all its terms and conditions for copying, distributing or modifying the
Program or works based on it.

[Kadena Spirekey terms and conditions](https://kadena.io/spirekey-license)
