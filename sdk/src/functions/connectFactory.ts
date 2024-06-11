import type { Account } from '@kadena-spirekey/spirekey';

import { SidebarManager } from '../sidebar-manager';

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

    let handleMessage: (event: MessageEvent) => void;

    const eventListenerPromise = new Promise<Account>((resolve) => {
      handleMessage = (event: MessageEvent) => {
        if (event.data.name === 'account-connected') {
          resolve(event.data.payload);
        }
      };

      window.addEventListener('message', handleMessage);
    });

    return Promise.race([eventListenerPromise, timeoutPromise]).finally(() => {
      sidebarManager.close();
      window.removeEventListener('message', handleMessage);
    });
  };
