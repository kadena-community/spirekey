import { IUnsignedCommand } from '@kadena/client';
import { sign } from '@kadena/cryptography-utils';

export const signWithKeyPair =
  ({ publicKey, secretKey }: { publicKey: string; secretKey: string }) =>
  (tx: IUnsignedCommand) => {
    const { sig } = sign(tx.cmd, { publicKey, secretKey });
    return {
      ...tx,
      sigs: [{ sig }], // TODO: Update to keep existing sigs
    };
  };
