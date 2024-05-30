'use client';

import {
  connectWithSpireKey,
  initSpireKey,
  onSpireKeyEvent,
  type SpireKeyEvent,
} from '@kadena-spirekey/sdk';
import { useEffect, useState } from 'react';

export default function Home() {
  const [events, setEvents] = useState<SpireKeyEvent[]>([]);

  useEffect(() => {
    initSpireKey();
    onSpireKeyEvent((event) => {
      setEvents((events) => [...events, event]);
    });
    () => {
      // cleanupSpireKey();
    };
  }, []);

  useEffect(() => {}, []);

  return (
    <main>
      <button onClick={connectWithSpireKey}>Connect</button>

      {events.map((event) => (
        <>{event.name}</>
      ))}
    </main>
  );
}
