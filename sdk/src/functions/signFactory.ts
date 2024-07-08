import {
  addSignatures,
  type ICommand,
  type IUnsignedCommand,
} from '@kadena/client';

import { Account } from '@kadena/spirekey-types';
import { EmbedManager } from '../embed-manager';
import { onSignCanceled, onTransactionsSigned } from './events';
import { areAccountsReady } from './ready';

export interface SignParams {
  embedManager: EmbedManager;
  timeout?: number;
}
export type SignedTransactions = {
  transactions: (IUnsignedCommand | ICommand)[];
  isReady: () => Promise<(IUnsignedCommand | ICommand)[]>;
};

export const sign = (
  transactionList: IUnsignedCommand[],
  accounts: Account[] = [],
): Promise<SignedTransactions> =>
  signFactory({ embedManager: EmbedManager.getInstance() })(
    transactionList,
    accounts,
  );

export const signFactory =
  ({ embedManager, timeout = 5 * 60 * 1000 }: SignParams) =>
  async (
    transactionList: IUnsignedCommand[],
    accounts: Account[] = [],
  ): Promise<SignedTransactions> => {
    const isList = Array.isArray(transactionList);
    const transactions = isList ? transactionList : [transactionList];

    const transactionsParams = transactions.reduce((params, tx) => {
      params.append(
        'transaction',
        Buffer.from(JSON.stringify(tx)).toString('base64'),
      );
      return params;
    }, new URLSearchParams());

    embedManager.showNotification();
    embedManager.openPopup(
      `/embedded/sidebar#${transactionsParams.toString()}`,
    );

    const timeoutPromise = new Promise<SignedTransactions>((_, reject) =>
      setTimeout(
        () => reject([new Error('Timeout: Signing took too long')]),
        timeout,
      ),
    );

    let removeSignListener: () => void;
    let removeCancelListener: () => void;

    const eventListenerPromise = new Promise<SignedTransactions>((resolve, reject) => {
      removeSignListener = onTransactionsSigned((signatures) => {
        const signedTransactions = transactions.flatMap((tx) =>
          signatures[tx.hash].map((sig) => addSignatures(tx, sig)),
        );

        resolve({
          transactions: signedTransactions,
          isReady: async (...args) => {
            embedManager.showNotification();
            const res = await areAccountsReady(
              signedTransactions,
              accounts,
            )(...args);
            embedManager.hideNotification();
            return res;
          },
        });
      });

      removeCancelListener = onSignCanceled(() => {
        reject(new Error('Uses canceled signin'));
      });
    });

    return Promise.race([eventListenerPromise, timeoutPromise]).finally(() => {
      embedManager.closePopup();
      embedManager.hideNotification();
      removeSignListener();
      removeCancelListener();
    });
  };
