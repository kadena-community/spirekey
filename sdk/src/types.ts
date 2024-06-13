import type { Account } from '@kadena-spirekey/spirekey';
import { ISignFunction } from '@kadena/client';

export interface SpireKeyWindow {
  connect: () => Promise<Account>;
  disconnect: () => void;
  sign: ISignFunction;
}

export type { Account, Device } from '@kadena-spirekey/spirekey';
