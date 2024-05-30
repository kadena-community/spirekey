'use client';

import { initSpireKey, type SpireKeyEvent } from '@kadena-spirekey/sdk';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

export default function Home() {
  const [events, setEvents] = useState<SpireKeyEvent[]>([]);

  useEffect(() => {
    const { onEvent } = initSpireKey({ hostUrl: 'http://localhost:1337' });

    onEvent((event) => {
      setEvents((events) => [...events, event]);
    });
  }, []);

  return (
    <main>
      <button onClick={() => window.spireKey.connect()}>Connect</button>

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
    </main>
  );
}
