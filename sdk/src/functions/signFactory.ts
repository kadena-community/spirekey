import {
  addSignatures,
  type ICommand,
  type ISignFunction,
  type IUnsignedCommand,
} from '@kadena/client';

import { SidebarManager } from '../sidebar-manager';
import { onTransactionsSigned } from './events';

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

    if (transactions.length > 1) {
      throw new Error(
        'Currently Kadena Spirekey only supports signing one transaction at a time',
      );
    }

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
    sidebarManager.setIFramePath(`/embedded/sidebar#${transactionsParams}`);

    const timeoutPromise = new Promise<ReturnValue>((_, reject) =>
      setTimeout(
        () => reject([new Error('Timeout: Signing took too long')]),
        timeout,
      ),
    );

    let removeListener: () => void;

    const eventListenerPromise = new Promise<ReturnValue>((resolve) => {
      removeListener = onTransactionsSigned((signatures) => {
        const signedTransactions = transactions.map((tx) =>
          addSignatures(tx, signatures[tx.hash]),
        );

        resolve(isList ? signedTransactions : signedTransactions[0]);
      });
    });

    return Promise.race([eventListenerPromise, timeoutPromise]).finally(() => {
      sidebarManager.close();
      removeListener();
    });
  }) as ISignFunction;
