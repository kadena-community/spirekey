import type {
  Account,
  SpireKeyEventName,
  SpireKeyEvents,
} from '@kadena-spirekey/types';

export function publishEvent<T extends SpireKeyEventName>(
  name: T,
  ...args: SpireKeyEvents[T] extends void ? [] : [SpireKeyEvents[T]]
): void;

export function publishEvent<T extends SpireKeyEventName>(
  name: T,
  ...args: any[]
): void {
  const payload = args[0];
  window.postMessage({ source: 'kadena-spirekey', name, payload }, '*');
}

export const onAccountConnected = (
  callback: (account: Account) => void,
): (() => void) => {
  const listener = (event: MessageEvent) => {
    if (
      event.data.source === 'kadena-spirekey' &&
      event.data.name === 'connected'
    ) {
      callback(event.data.payload as SpireKeyEvents['connected']);
    }
  };

  window.addEventListener('message', listener);

  return () => {
    window.removeEventListener('message', listener);
  };
};

export const onTransactionsSigned = (
  callback: (data: Record<string, { sig: string; pubKey?: string }>) => void,
): (() => void) => {
  const listener = (event: MessageEvent) => {
    if (
      event.data.source === 'kadena-spirekey' &&
      event.data.name === 'signed'
    ) {
      callback(event.data.payload as SpireKeyEvents['signed']);
    }
  };

  window.addEventListener('message', listener);

  return () => {
    window.removeEventListener('message', listener);
  };
};
