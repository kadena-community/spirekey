import {
  addSignatures,
  type ICommand,
  type ISignFunction,
  type IUnsignedCommand,
} from '@kadena/client';

import * as styles from '../styles.css';

export interface SignParams {
  iframe: HTMLIFrameElement;
  timeout?: number;
}

type ReturnValue =
  | (IUnsignedCommand | ICommand)[]
  | IUnsignedCommand
  | ICommand;

export const createSign = ({
  iframe,
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

    iframe.classList.add(styles.spirekeySidebarOpened);

    const newSrc = new URL(iframe.src);
    newSrc.pathname = '/embedded/sidebar';
    newSrc.hash = `#${transactionsParams}`;
    iframe.src = newSrc.toString();

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
