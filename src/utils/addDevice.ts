import { asyncPipe } from '@/utils/shared/asyncPipe';
import { l1Client } from '@/utils/shared/client';
import { ICommand, ICommandResult } from '@kadena/client';
import { isSignedCommand } from '@kadena/pactjs';

export const addDeviceOnChain = async (
  transaction: ICommand,
): Promise<ICommandResult> =>
  asyncPipe(
    () =>
      isSignedCommand(transaction)
        ? transaction
        : Promise.reject('TX_NOT_SIGNED'),
    (tx) => l1Client.local(tx).then((res) => [tx, res]),
    ([tx, res]) => (res.result.status === 'success' ? tx : Promise.reject(res)),
    (tx) => l1Client.submit(tx),
    (tx) => l1Client.listen(tx),
  )({});
