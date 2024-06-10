import type { ICommand, IUnsignedCommand } from '@kadena/client';
import { vitest } from 'vitest';

const addSignatures = vitest
  .fn()
  .mockImplementation(
    (
      transaction: IUnsignedCommand,
      ...signatures: { sig: string; pubKey?: string }[]
    ): IUnsignedCommand | ICommand => {
      const { cmd, hash } = transaction;

      return {
        cmd,
        hash,
        sigs: signatures.map((signature) => ({ sig: signature.sig })),
      };
    },
  );

module.exports =
  await vitest.importActual<typeof import('@kadena/client')>('@kadena/client');

export { addSignatures };
