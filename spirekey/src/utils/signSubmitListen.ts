import { addSignatures, IUnsignedCommand } from '@kadena/client';
import { sign } from '@kadena/cryptography-utils';

export const signWithKeyPair =
  ({ publicKey, secretKey }: { publicKey: string; secretKey: string }) =>
  (tx: IUnsignedCommand) => {
    const { sig } = sign(tx.cmd, { publicKey, secretKey });
    if (!sig) throw new Error('Failed to sign transaction');
    return addSignatures(tx, { sig, pubKey: publicKey });
  };
