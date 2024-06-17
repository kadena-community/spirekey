import type { Account } from '@kadena-spirekey/types';
import { ISignFunction } from '@kadena/client';

export interface SpireKeyWindow {
  connect: () => Promise<Account>;
  sign: ISignFunction;
}

export type { Account, Device } from '@kadena-spirekey/types';
