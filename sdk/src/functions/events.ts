import { Account } from '@kadena-spirekey/spirekey';

const supportedEvents = [
  'connected',
  'connected:minted',
  'disconnected',
  'signed',
  'signed:submittable',
] as const;

export type SpireKeyEventName = (typeof supportedEvents)[number];

export type SpireKeyEventPayloads = {
  connected: Account;
  'connected:minted': Account;
  disconnected: undefined;
  signed: Record<string, { sig: string; pubKey?: string }>;
  'signed:submittable': Record<string, { sig: string; pubKey?: string }>;
};

export type SpireKeyEvent = {
  source: 'kadena-spirekey';
  name: SpireKeyEventName;
  payload: SpireKeyEventPayloads[SpireKeyEventName];
};

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
    if (event.data.name === 'connected') {
      callback(event.data.payload as SpireKeyEventPayloads['connected']);
    }
  };

  window.addEventListener('message', listener);

  return () => {
    window.removeEventListener('message', listener);
  };
};

export const onAccountDisconnected = (callback: () => void): (() => void) => {
  const listener = (event: MessageEvent) => {
    if (event.data.name === 'disconnected') {
      callback();
    }
  };

  window.addEventListener('message', listener);

  return () => {
    window.removeEventListener('message', listener);
  };
};

export const onAllTransactionsSigned = (
  callback: (data: Record<string, { sig: string; pubKey?: string }>) => void,
): (() => void) => {
  const listener = (event: MessageEvent) => {
    if (event.data.name === 'signed') {
      callback(event.data.payload as SpireKeyEventPayloads['signed']);
    }
  };

  window.addEventListener('message', listener);

  return () => {
    window.removeEventListener('message', listener);
  };
};
