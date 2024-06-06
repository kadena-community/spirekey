import type { ICommand, ISignFunction, IUnsignedCommand } from '@kadena/client';

export interface SignParams {
  hostUrl: string;
  iframe: HTMLIFrameElement;
}

export const createSign =
  ({ hostUrl, iframe }: SignParams): ISignFunction =>
  // @ts-expect-error: @TODO fix type
  async (transactionList) => {
    const isList = Array.isArray(transactionList);
    const transactions = isList ? transactionList : [transactionList];
    const transactionsParams = transactions
      .map((tx) => {
        return `transaction=${Buffer.from(JSON.stringify(tx)).toString('base64')}`;
      })
      .join('&');

    iframe.classList.add('spirekey-sidebar-opened');
    iframe.src = `${hostUrl}/embedded/sidebar/#${transactionsParams}`;

    const timeout = new Promise<(IUnsignedCommand | ICommand)[]>((_, reject) =>
      setTimeout(
        () => reject([new Error('Timeout: Signing process took too long')]),
        5 * 60 * 1000,
      ),
    );

    const messageListener = new Promise<(IUnsignedCommand | ICommand)[]>(
      (resolve) => {
        const handleMessage = (event: MessageEvent) => {
          if (event.data.name === 'signed-all') {
            const signedTransactions: (IUnsignedCommand | ICommand)[] =
              transactions.map((tx) => {
                return {
                  ...tx,
                  sigs: event.data.payload.signatures[tx.hash]
                    ? [{ sig: event.data.payload.signatures[tx.hash] }]
                    : [],
                };
              });
            resolve(signedTransactions);
          }
        };

        window.addEventListener('message', handleMessage);
      },
    );

    return Promise.race([messageListener, timeout]);
  };
