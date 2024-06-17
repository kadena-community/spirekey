import type { Account } from '@kadena-spirekey/types';

import { SidebarManager } from '../sidebar-manager';
import { onAccountConnected } from './events';

export interface ConnectParams {
  sidebarManager: SidebarManager;
  timeout?: number;
}

export const connectFactory =
  ({ sidebarManager, timeout = 5 * 60 * 1000 }: ConnectParams) =>
  (): Promise<Account> => {
    sidebarManager.open();

    const timeoutPromise = new Promise<Account>((_, reject) =>
      setTimeout(
        () => reject([new Error('Timeout: Connecting took too long')]),
        timeout,
      ),
    );

    let removeListener: () => void;

    const eventListenerPromise = new Promise<Account>((resolve) => {
      removeListener = onAccountConnected((account: Account) => {
        resolve(account);
      });
    });

    return Promise.race([eventListenerPromise, timeoutPromise]).finally(() => {
      sidebarManager.close();
      removeListener();
    });
  };
