import type {
  Account,
  SpireKeyCallback,
  SpireKeyEventName,
  SpireKeyEvents,
} from '@kadena-spirekey/types';

export function publishEvent<T extends SpireKeyEventName>(
  name: T,
  ...args: SpireKeyEvents[T] extends void ? [] : [SpireKeyEvents[T]]
): void {
  const payload = args[0];
  window.postMessage({ source: 'kadena-spirekey', name, payload }, '*');
}

const getEventListener =
  <T extends SpireKeyEventName, K extends SpireKeyEvents[T]>(
    eventName: T,
    callback: (payload: K) => any,
  ) =>
  (event: MessageEvent) => {
    if (event.data.source !== 'kadena-spirekey') return;
    if (event.data.name !== eventName) return;
    callback(event.data.payload);
  };

export const onSpireKeyEvent = <
  T extends SpireKeyEventName,
  K extends SpireKeyEvents[T],
>(
  eventName: T,
  callback: (payload: K) => any,
) => {
  const listener = getEventListener(eventName, callback);

  window.addEventListener('message', listener);

  return () => {
    window.removeEventListener('message', listener);
  };
};

export const onAccountConnected = (callback: SpireKeyCallback<'connected'>) =>
  onSpireKeyEvent('connected', callback);

export const onTransactionsSigned = (callback: SpireKeyCallback<'signed'>) =>
  onSpireKeyEvent('signed', callback);
