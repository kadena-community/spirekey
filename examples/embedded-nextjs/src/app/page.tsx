'use client';

import {
  initSpireKey,
  onAccountConnected,
  type Account,
} from '@kadena-spirekey/sdk';
import { transfer } from '@kadena/client-utils/coin';
import { useEffect, useState } from 'react';

export default function Home() {
  const [account, setAccount] = useState<Account>();

  useEffect(() => {
    initSpireKey({ hostUrl: 'http://localhost:1337' });

    onAccountConnected((account) => {
      setAccount(account);
    });
  }, []);

  const signTransaction = async () => {
    if (!account) {
      throw new Error('No account connected');
    }

    const transaction = transfer(
      {
        sender: {
          account: account.accountName,
          publicKeys: [account.devices[0].guard.keys[0]],
        },
        receiver: 'k:abcd',
        amount: '1',
        chainId: '1',
      },
      {
        host: 'http://localhost:8080',
        defaults: {
          networkId: 'development',
        },
        sign: window.spireKey.sign,
      },
    );

    await transaction.execute();
  };

  return (
    <main>
      {!account && (
        <button onClick={() => window.spireKey.connect()}>Connect</button>
      )}
      {account && (
        <>
          Connected as {account.alias} ({account.accountName}){' '}
          <button onClick={signTransaction}>Sign</button>
        </>
      )}
    </main>
  );
}
