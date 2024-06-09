'use client';

import { initSpireKey, type SpireKeyEvent } from '@kadena-spirekey/sdk';

import { useEffect, useState } from 'react';

import styles from './styles.module.css';

export default function Home() {
  const [events, setEvents] = useState<SpireKeyEvent[]>([]);
  const [account, setAccount] = useState();

  useEffect(() => {
    const { eventBus } = initSpireKey({ hostUrl: 'http://localhost:1337' });

    eventBus.subscribeToAll((event) => {
      setEvents((events) => [...events, event]);

      if (event.name === 'account-connected') {
        setAccount(event.payload as any);
      }
    });

    eventBus.subscribe('account-disconnected', () => {
      setAccount(undefined);
    });
  }, []);

  const signTransaction = () => {
    const transaction = '@TODO';
    window.spireKey.sign(transaction);
  };

  return (
    <main>
      {!account && (
        <button onClick={() => window.spireKey.connect()}>Connect</button>
      )}
      {account && <button onClick={signTransaction}>Sign</button>}
      {account && (
        <button onClick={() => window.spireKey.disconnect()}>Disconnect</button>
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
