import {
  addSignatures,
  type ICommand,
  type IUnsignedCommand,
} from '@kadena/client';

import { Account } from '@kadena/spirekey-types';
import { EmbedManager } from '../embed-manager';
import { onTransactionsSigned } from './events';
import { areAccountsReady } from './ready';

export interface SignParams {
  embedManager: EmbedManager;
  timeout?: number;
}
type ReturnValue = {
  transactions: (IUnsignedCommand | ICommand)[];
  isReady: () => Promise<(IUnsignedCommand | ICommand)[]>;
};

export const sign = (
  transactionList: IUnsignedCommand[],
  accounts: Account[] = [],
): Promise<ReturnValue> =>
  signFactory({ embedManager: EmbedManager.getInstance() })(
    transactionList,
    accounts,
  );

export const signFactory =
  ({ embedManager, timeout = 5 * 60 * 1000 }: SignParams) =>
  async (
    transactionList: IUnsignedCommand[],
    accounts: Account[] = [],
  ): Promise<ReturnValue> => {
    const isList = Array.isArray(transactionList);
    const transactions = isList ? transactionList : [transactionList];

    const transactionsParams = transactions.reduce((params, tx) => {
      params.append(
        'transaction',
        Buffer.from(JSON.stringify(tx)).toString('base64'),
      );
      return params;
    }, new URLSearchParams());

    embedManager.openPopup(`/embedded/sidebar#${transactionsParams.toString()}`);

    const timeoutPromise = new Promise<ReturnValue>((_, reject) =>
      setTimeout(
        () => reject([new Error('Timeout: Signing took too long')]),
        timeout,
      ),
    );

    let removeListener: () => void;

    const eventListenerPromise = new Promise<ReturnValue>((resolve) => {
      removeListener = onTransactionsSigned((signatures) => {
        const signedTransactions = transactions.flatMap((tx) =>
          signatures[tx.hash].map((sig) => addSignatures(tx, sig)),
        );

        resolve({
          transactions: signedTransactions,
          isReady: areAccountsReady(signedTransactions, accounts),
        });
      });
    });

    return Promise.race([eventListenerPromise, timeoutPromise]).finally(() => {
      embedManager.closePopup();
      removeListener();
    });
  };
