import type { Account } from '@kadena/spirekey-types';

import { type ChainId } from '@kadena/client';
import { EmbedManager } from '../embed-manager';
import { onAccountConnected, onConnectCanceled } from './events';
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
    embedManager.showNotification();
    embedManager.openPopup(`/embedded/sidebar#${connectParams.toString()}`);

    const timeoutPromise = new Promise<ConnectedAccount>((_, reject) =>
      setTimeout(
        () => reject([new Error('Timeout: Connecting took too long')]),
        timeout,
      ),
    );

    let removeConnectListener: () => void;
    let removeCancelListener: () => void;

    const eventListenerPromise = new Promise<ConnectedAccount>(
      (resolve, reject) => {
        removeConnectListener = onAccountConnected((account: Account) => {
          resolve({
            ...account,
            isReady: async () => {
              embedManager.showNotification();
              const res = await isAccountReady(account)();
              embedManager.hideNotification();
              return res;
            },
          });
        });
        removeCancelListener = onConnectCanceled(() => {
          reject(new Error('User canceled connection'));
        });
      },
    );

    return Promise.race([eventListenerPromise, timeoutPromise]).finally(() => {
      embedManager.closePopup();
      embedManager.hideNotification();
      removeConnectListener();
      removeCancelListener();
    });
  };
