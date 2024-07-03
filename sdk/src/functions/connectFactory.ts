import type { Account } from '@kadena/spirekey-types';

import { type ChainId } from '@kadena/client';
import { EmbedManager } from '../embed-manager';
import { onAccountConnected } from './events';
import { isAccountReady } from './ready';

export interface ConnectParams {
  embedManager: EmbedManager;
  timeout?: number;
}

type ConnectedAccount = Account & { isReady: () => Promise<Account> };

export const connect = (
  networkId: string,
  chainId: ChainId,
): Promise<ConnectedAccount> =>
  connectFactory({ embedManager: EmbedManager.getInstance() })(
    networkId,
    chainId,
  );

export const connectFactory =
  ({ embedManager, timeout = 5 * 60 * 1000 }: ConnectParams) =>
  async (networkId: string, chainId: ChainId): Promise<ConnectedAccount> => {
    const connectParams = new URLSearchParams({
      networkId,
      chainId,
    });
    embedManager.openPopup(`/embedded/sidebar#${connectParams.toString()}`);
    embedManager.showNotification();

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
      embedManager.closePopup();
      removeListener();
    });
  };
