import type { Account } from '@kadena-spirekey/types';

import { EmbedManager } from '../embed-manager';
import { onAccountConnected } from './events';

export interface ConnectParams {
  embedManager: EmbedManager;
  timeout?: number;
}

export const connectFactory =
  ({ embedManager, timeout = 5 * 60 * 1000 }: ConnectParams) =>
  (): Promise<Account> => {
    embedManager.openSidebar();

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
      embedManager.closeSidebar();
      removeListener();
    });
  };

export const connect = () =>
  connectFactory({ embedManager: EmbedManager.getInstance() })();
