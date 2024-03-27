import { asyncPipe } from '@/utils/shared/asyncPipe';
import { l1Client } from '@/utils/shared/client';
import { ICommand, ITransactionDescriptor } from '@kadena/client';
import { isSignedCommand } from '@kadena/pactjs';

export const submitTransaction = async (
  transaction: ICommand,
): Promise<ITransactionDescriptor> =>
  asyncPipe(
    () =>
      isSignedCommand(transaction)
        ? transaction
        : Promise.reject('TX_NOT_SIGNED'),
    (tx) => l1Client.local(tx).then((res) => [tx, res]),
    ([tx, res]) => (res.result.status === 'success' ? tx : Promise.reject(res)),
    (tx) => l1Client.submit(tx),
  )({});
