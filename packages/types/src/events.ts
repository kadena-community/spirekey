import type { Account } from './account';

const supportedEvents = [
  'connected',
  'connected:minted',
  'signed',
  'signed:submittable',
] as const;

export type SpireKeyEventName = (typeof supportedEvents)[number];

export type SpireKeyEventPayloads = {
  connected: Account;
  'connected:minted': Account;
  signed: Record<string, { sig: string; pubKey?: string }>;
  'signed:submittable': Record<string, { sig: string; pubKey?: string }>;
};

export type SpireKeyEvent = {
  source: 'kadena-spirekey';
  name: SpireKeyEventName;
  payload: SpireKeyEventPayloads[SpireKeyEventName];
};
