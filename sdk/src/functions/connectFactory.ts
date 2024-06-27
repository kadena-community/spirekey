import type { Account } from '@kadena/spirekey-types';

import { EmbedManager } from '../embed-manager';
import { onAccountConnected } from './events';
import { isAccountReady } from './ready';

export interface ConnectParams {
  embedManager: EmbedManager;
  timeout?: number;
}

type ConnectedAccount = Account & { isReady: () => Promise<Account> };

export const connect = () =>
  connectFactory({ embedManager: EmbedManager.getInstance() })();

export const connectFactory =
  ({ embedManager, timeout = 5 * 60 * 1000 }: ConnectParams) =>
  (): Promise<ConnectedAccount> => {
    embedManager.openSidebar();

    const timeoutPromise = new Promise<ConnectedAccount>((_, reject) =>
      setTimeout(
        () => reject([new Error('Timeout: Connecting took too long')]),
        timeout,
      ),
    );

    let removeListener: () => void;

    const eventListenerPromise = new Promise<ConnectedAccount>((resolve) => {
      removeListener = onAccountConnected((account: Account) => {
        resolve({ ...account, isReady: isAccountReady(account) });
      });
    });

    return Promise.race([eventListenerPromise, timeoutPromise]).finally(() => {
      embedManager.closeSidebar();
      removeListener();
    });
  };
