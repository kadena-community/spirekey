import {
  addSignatures,
  type ICommand,
  type ISignFunction,
  type IUnsignedCommand,
} from '@kadena/client';

export interface SignParams {
  iframe: HTMLIFrameElement;
}

export const createSign =
  ({ iframe }: SignParams): ISignFunction =>
  // @ts-expect-error: @TODO fix type
  async (transactionList) => {
    const isList = Array.isArray(transactionList);
    const transactions = isList ? transactionList : [transactionList];

    const transactionsParams = transactions
      .map(
        (tx) =>
          `transaction=${Buffer.from(JSON.stringify(tx)).toString('base64')}`,
      )
      .join('&');

    iframe.classList.add('spirekey-sidebar-opened');

    const newSrc = new URL(iframe.src);
    newSrc.pathname = '/embedded/sidebar';
    newSrc.hash = `#${transactionsParams}`;
    iframe.src = newSrc.toString();

    const timeout = new Promise<(IUnsignedCommand | ICommand)[]>((_, reject) =>
      setTimeout(
        () => reject([new Error('Timeout: Signing took too long')]),
        5 * 60 * 1000,
      ),
    );

    let handleMessage: (event: MessageEvent) => void;

    const messageListener = new Promise<(IUnsignedCommand | ICommand)[]>(
      (resolve) => {
        handleMessage = (event: MessageEvent) => {
          if (event.data.name === 'all-transactions-signed') {
            const signedTransactions = event.data.payload.transactions;

            resolve(signedTransactions);
          }
        };

        window.addEventListener('message', handleMessage);
      },
    );

    return Promise.race([messageListener, timeout]).finally(() => {
      window.removeEventListener('message', handleMessage);
    });
  };
