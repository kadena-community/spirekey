import type { Account } from '@kadena-spirekey/spirekey';

export interface ConnectParams {
  iframe: HTMLIFrameElement;
  hideSidebar: () => void;
}

export const createConnect =
  ({ iframe, hideSidebar }: ConnectParams) =>
  (): Promise<Account> => {
    iframe.classList.add('spirekey-sidebar-opened');

    const timeout = new Promise((_, reject) =>
      setTimeout(
        () => reject([new Error('Timeout: Connecting took too long')]),
        5 * 60 * 1000,
      ),
    );

    let handleMessage: (event: MessageEvent) => void;

    const messageListener = new Promise<Account>((resolve) => {
      handleMessage = (event: MessageEvent) => {
        if (event.data.name === 'account-connected') {
          resolve(event.data.payload);
        }
      };

      window.addEventListener('message', handleMessage);
    });

    return Promise.race([messageListener, timeout]).finally(() => {
      hideSidebar();
      window.removeEventListener('message', handleMessage);
    });
  };
