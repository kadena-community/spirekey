import type { Account } from '@kadena-spirekey/spirekey';

import * as styles from '../styles.css';

export interface ConnectParams {
  iframe: HTMLIFrameElement;
  hideSidebar: () => void;
  timeout?: number;
}

export const connectFactory =
  ({ iframe, hideSidebar, timeout = 5 * 60 * 1000 }: ConnectParams) =>
  (): Promise<Account> => {
    iframe.classList.add(styles.spirekeySidebarOpened);

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
      hideSidebar();
      window.removeEventListener('message', handleMessage);
    });
  };
