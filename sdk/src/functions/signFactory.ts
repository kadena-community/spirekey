import {
  addSignatures,
  type ICommand,
  type ISignFunction,
  type IUnsignedCommand,
} from '@kadena/client';

import { SidebarManager } from '@/sidebar-manager';

export interface SignParams {
  sidebarManager: SidebarManager;
  timeout?: number;
}

type ReturnValue =
  | (IUnsignedCommand | ICommand)[]
  | IUnsignedCommand
  | ICommand;

export const signFactory = ({
  sidebarManager,
  timeout = 5 * 60 * 1000,
}: SignParams): ISignFunction =>
  (async (transactionList) => {
    const isList = Array.isArray(transactionList);
    const transactions = isList ? transactionList : [transactionList];
    const transactionsParams = transactions
      .map(
        (tx) =>
          `transaction=${Buffer.from(JSON.stringify(tx)).toString('base64')}`,
      )
      .join('&');

    const newSrc = new URL(sidebarManager.iframe.src);
    newSrc.pathname = '/embedded/sidebar';
    newSrc.hash = `#${transactionsParams}`;

    sidebarManager.open();
    sidebarManager.setIFramePath(
      `/embedded/sidebar/#transaction=${newSrc.toString()}`,
    );

    const timeoutPromise = new Promise<ReturnValue>((_, reject) =>
      setTimeout(
        () => reject([new Error('Timeout: Signing took too long')]),
        timeout,
      ),
    );

    let handleMessage: (event: MessageEvent) => void;

    const eventListenerPromise = new Promise<ReturnValue>((resolve) => {
      handleMessage = (event: MessageEvent) => {
        if (event.data.name === 'all-transaction-signatures') {
          const signedTransactions = transactions.map((tx) =>
            addSignatures(tx, {
              ...event.data.payload.signatures[tx.hash],
            }),
          );

          resolve(isList ? signedTransactions : signedTransactions[0]);
        }
      };

      window.addEventListener('message', handleMessage);
    });

    return Promise.race([eventListenerPromise, timeoutPromise]).finally(() => {
      window.removeEventListener('message', handleMessage);
    });
  }) as ISignFunction;
