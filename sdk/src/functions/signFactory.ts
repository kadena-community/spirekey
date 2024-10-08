import {
  addSignatures,
  type ICommand,
  type IUnsignedCommand,
} from '@kadena/client';

import { OptimalTransactionsAccount } from '@kadena/spirekey-types';
import { EmbedManager } from '../embed-manager';
import { onSignCanceled, onTransactionsSigned } from './events';
import { areAccountsReady } from './ready';

interface SignParams {
  embedManager: EmbedManager;
  timeout?: number;
}
export type SignedTransactions = {
  transactions: (IUnsignedCommand | ICommand)[];
  isReady: () => Promise<(IUnsignedCommand | ICommand)[]>;
};

export const sign = (
  transactionList: IUnsignedCommand[],
  accounts: OptimalTransactionsAccount[] = [],
): Promise<SignedTransactions> =>
  signFactory({ embedManager: EmbedManager.getInstance() })(
    transactionList,
    accounts,
  );

export const signFactory =
  ({ embedManager, timeout = 5 * 60 * 1000 }: SignParams) =>
  async (
    transactionList: IUnsignedCommand[],
    accounts: OptimalTransactionsAccount[] = [],
  ): Promise<SignedTransactions> => {
    const isList = Array.isArray(transactionList);
    const transactions = isList ? transactionList : [transactionList];

    const transactionsParams = new URLSearchParams({
      accounts: JSON.stringify(accounts),
      transactions: JSON.stringify(transactions),
    });

    embedManager.showNotification();
    embedManager.openPopup(`/sign#${transactionsParams.toString()}`);

    const timeoutPromise = new Promise<SignedTransactions>((_, reject) =>
      setTimeout(
        () => reject([new Error('Timeout: Signing took too long')]),
        timeout,
      ),
    );

    let removeSignListener: () => void;
    let removeCancelListener: () => void;

    const eventListenerPromise = new Promise<SignedTransactions>(
      (resolve, reject) => {
        removeSignListener = onTransactionsSigned((signatures) => {
          const signedTxMap = signatures.txs || signatures.tx;
          const signedTransactions = transactions
            .flatMap((tx) =>
              signedTxMap[tx.hash]?.map((sig) => addSignatures(tx, sig)),
            )
            .filter((tx) => !!tx);

          resolve({
            transactions: signedTransactions,
            isReady: async () => {
              embedManager.showNotification();
              await areAccountsReady(signatures.accounts);
              embedManager.hideNotification();
              return signedTransactions;
            },
          });
        });

        removeCancelListener = onSignCanceled(() => {
          reject(new Error('User canceled signing'));
        });
      },
    );

    return await Promise.race([eventListenerPromise, timeoutPromise]).finally(
      async () => {
        embedManager.closePopup();
        removeSignListener();
        removeCancelListener();
        await embedManager.hideNotification();
      },
    );
  };
