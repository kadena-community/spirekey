import type { IUnsignedCommand } from '@kadena/client';
import { describe, expect, it, vi, vitest } from 'vitest';

import { publishEvent } from '../events';
import { sign } from '../signFactory';

vitest.mock('@kadena/client');
vitest.stubGlobal('open', vi.fn());

describe('signFactory', () => {
  it('signs a transaction', async () => {
    const transaction: IUnsignedCommand = {
      hash: '123',
      cmd: '{"code": "test"}',
      sigs: [],
    };
    const promise = sign([transaction]);

    // should refactor this to publish an array of signatured
    publishEvent('signed', {
      accounts: [],
      tx: { '123': [{ sig: 'signature', pubKey: 'pubkey' }] },
    });

    await expect(promise).resolves.toMatchObject({
      transactions: [
        {
          ...transaction,
          sigs: [{ sig: 'signature' }],
        },
      ],
    });
  });

  it('signs multiple transactions', async () => {
    const transactions: IUnsignedCommand[] = [
      { hash: '123', cmd: '{"code": "test1"}', sigs: [] },
      { hash: '456', cmd: '{"code": "test2"}', sigs: [] },
    ];
    const promise = sign(transactions);

    publishEvent('signed', {
      accounts: [],
      tx: {
        '123': [{ sig: 'signature1', pubKey: 'pubKey1' }],
        '456': [{ sig: 'signature2', pubKey: 'pubKey2' }],
      },
    });

    await expect(promise).resolves.toMatchObject({
      transactions: [
        { ...transactions[0], sigs: [{ sig: 'signature1' }] },
        { ...transactions[1], sigs: [{ sig: 'signature2' }] },
      ],
    });
  });
});
