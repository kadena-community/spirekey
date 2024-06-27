import {
  addSignatures,
  type ICommand,
  type IUnsignedCommand,
} from '@kadena/client';

import { Account } from '@kadena-spirekey/types';
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
) =>
  signFactory({ embedManager: EmbedManager.getInstance() })(
    transactionList,
    accounts,
  );

export const signFactory =
  ({ embedManager, timeout = 5 * 60 * 1000 }: SignParams) =>
  async (transactionList: IUnsignedCommand[], accounts: Account[] = []) => {
    const isList = Array.isArray(transactionList);
    const transactions = isList ? transactionList : [transactionList];

    if (transactions.length > 1) {
      throw new Error(
        'Currently Kadena SpireKey only supports signing one transaction at a time',
      );
    }

    const transactionsParams = transactions
      .map(
        (tx) =>
          `transaction=${Buffer.from(JSON.stringify(tx)).toString('base64')}`,
      )
      .join('&');

    const newSrc = new URL(embedManager.sidebar.src);
    newSrc.pathname = '/embedded/sidebar';
    newSrc.hash = `#${transactionsParams}`;

    embedManager.openSidebar();
    embedManager.setSidebarPath(`/embedded/sidebar#${transactionsParams}`);

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
      embedManager.closeSidebar();
      removeListener();
    });
  };
