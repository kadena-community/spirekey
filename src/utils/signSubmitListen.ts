import { asyncPipe } from '@/utils/shared/asyncPipe';
import {
  IClient,
  IUnsignedCommand,
  createSignWithChainweaver,
  createTransaction,
} from '@kadena/client';
import { sign } from '@kadena/cryptography-utils';
import { isSignedCommand } from '@kadena/pactjs';

export const signSubmitListen = (client: IClient) => {
  const signWithChainweaver = createSignWithChainweaver();

  return asyncPipe(
    createTransaction,
    signWithChainweaver,
    (tx) => (isSignedCommand(tx) ? tx : Promise.reject('TX_NOT_SIGNED')),
    // do local first to check if everything is ok without paying gas
    (tx) => client.local(tx).then((res) => [tx, res]),
    ([tx, res]) => (res.result.status === 'success' ? tx : Promise.reject(res)),
    (tx) => client.submit(tx),
    (tx) => client.listen(tx),
  );
};

export const signWithKeyPair =
  ({ publicKey, secretKey }: { publicKey: string; secretKey: string }) =>
  (tx: IUnsignedCommand) => {
    const { sig } = sign(tx.cmd, { publicKey, secretKey });
    return {
      ...tx,
      sigs: [{ sig }], // TODO: Update to keep existing sigs
    };
  };

export const signKeyPairSubmitListen = (
  client: IClient,
  keyPair: { publicKey: string; secretKey: string },
) => {
  return asyncPipe(
    createTransaction,
    signWithKeyPair(keyPair),
    (tx) => client.local(tx).then((res) => [tx, res]),
    ([tx, res]) => (res.result.status === 'success' ? tx : Promise.reject(res)),
    (tx) => client.submit(tx),
    (tx) => client.listen(tx),
  );
};

export const signKeyPairLocal = (
  client: IClient,
  keyPair: { publicKey: string; secretKey: string },
) => {
  return asyncPipe(createTransaction, signWithKeyPair(keyPair), client.local);
};
