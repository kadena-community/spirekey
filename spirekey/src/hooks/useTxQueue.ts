import { l1Client } from '@/utils/shared/client';
import { Account } from '@kadena/spirekey-types';
import useSWR from 'swr';

export const useTxQueue = (
  accounts: Account[],
  onAccountsReady: (updatedAccounts: Account[]) => void,
) => {
  useSWR(
    accounts
      ?.flatMap((account) => account.txQueue.map((tx) => JSON.stringify(tx)))
      .join(','),
    async () => {
      const updatedAccounts = await Promise.all(
        accounts.map(async (account) => {
          const txQueue = await Promise.all(
            account.txQueue.map(async (tx) => {
              const res = await l1Client.listen(tx);
              if (!res.continuation) return null;
              // get spv proof
              // create continuation tx
              // submit
              // return tx of continuation
              return tx;
            }),
          );
          return {
            ...account,
            txQueue: txQueue.filter((tx) => !!tx),
          };
        }),
      );

      onAccountsReady(updatedAccounts);
    },
  );
};
