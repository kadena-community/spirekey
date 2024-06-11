'use client';

import {
  initSpireKey,
  type Account,
  type SpireKeyEvent,
} from '@kadena-spirekey/sdk';
import { transfer } from '@kadena/client-utils/coin';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

export default function Home() {
  const [events, setEvents] = useState<SpireKeyEvent[]>([]);
  const [account, setAccount] = useState<Account>();

  useEffect(() => {
    const { eventBus } = initSpireKey({ hostUrl: 'http://localhost:1337' });

    eventBus.subscribeToAll((event: SpireKeyEvent) => {
      setEvents((events) => [...events, event]);

      if (event.name === 'account-connected') {
        setAccount(event.payload as Account);
      }
    });

    eventBus.subscribe('account-disconnected', () => {
      setAccount(undefined);
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
          <button onClick={() => window.spireKey.disconnect()}>
            Disconnect
          </button>
          <br />
          <button onClick={signTransaction}>Sign</button>
        </>
      )}

      <details>
        <summary>View events</summary>
        <div>
          {events.map((event, i) => (
            <div key={i} className={styles.event}>
              <div>
                <strong>Name</strong>
                <br /> {event.name}
              </div>

              {event.payload && (
                <div>
                  <strong>Payload</strong>
                  <pre>{JSON.stringify(event.payload, null, 2)}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </details>
    </main>
  );
}
