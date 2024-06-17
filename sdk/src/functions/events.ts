import type {
  Account,
  SpireKeyEventName,
  SpireKeyEventPayloads,
} from '@kadena-spirekey/types';

export const publishEvent = <T extends SpireKeyEventName>(
  name: T,
  payload: SpireKeyEventPayloads[T],
): void => {
  window.postMessage({ source: 'kadena-spirekey', name, payload }, '*');
};

export const onAccountConnected = (
  callback: (account: Account) => void,
): (() => void) => {
  const listener = (event: MessageEvent) => {
    if (
      event.data.source === 'kadena-spirekey' &&
      event.data.name === 'connected'
    ) {
      callback(event.data.payload as SpireKeyEventPayloads['connected']);
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
      callback(event.data.payload as SpireKeyEventPayloads['signed']);
    }
  };

  window.addEventListener('message', listener);

  return () => {
    window.removeEventListener('message', listener);
  };
};
