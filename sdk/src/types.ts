import type { Account } from '@kadena-spirekey/spirekey';
import { ISignFunction } from '@kadena/client';

export interface SpireKeyEvent {
  source: 'kadena-spirekey';
  name: string;
  payload?: Record<string, unknown>;
}

export interface SpireKeyWindow {
  connect: () => Promise<Account>;
  sign: ISignFunction;
  onEvent: (callback: (data: SpireKeyEvent) => void) => void;
}

export type { Account, Device } from '@kadena-spirekey/spirekey';
