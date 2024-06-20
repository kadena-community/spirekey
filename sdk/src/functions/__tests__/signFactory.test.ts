import type { IUnsignedCommand } from '@kadena/client';
import { beforeEach, describe, expect, it, vitest } from 'vitest';

import { EmbedManager } from '../../embed-manager';
import * as styles from '../../styles.css';
import { publishEvent } from '../events';
import { signFactory } from '../signFactory';

vitest.mock('@kadena/client');

describe('signFactory', () => {
  let sign: ReturnType<typeof signFactory>;
  let embedManager = new EmbedManager('http://localhost:1337');

  beforeEach(() => {
    embedManager = new EmbedManager('http://localhost:1337');

    sign = signFactory({
      embedManager,
    });
  });

  it('signs a transaction', async () => {
    const transaction: IUnsignedCommand = {
      hash: '123',
      cmd: '{"code": "test"}',
      sigs: [],
    };
    const promise = sign(transaction);

    expect(
      embedManager.sidebar.classList.contains(styles.spirekeySidebarOpen),
    ).toBe(true);
    expect(embedManager.sidebar.src).toContain(
      `/embedded/sidebar#transaction=`,
    );

    publishEvent('signed', {
      '123': { sig: 'signature' },
    });

    await expect(promise).resolves.toEqual({
      ...transaction,
      sigs: [{ sig: 'signature' }],
    });
  });

  it.skip('signs multiple transactions', async () => {
    const transactions: IUnsignedCommand[] = [
      { hash: '123', cmd: '{"code": "test1"}', sigs: [] },
      { hash: '456', cmd: '{"code": "test2"}', sigs: [] },
    ];
    const promise = sign(transactions);

    expect(embedManager.sidebar.src).toContain(
      `/embedded/sidebar#transaction=`,
    );

    publishEvent('signed', {
      '123': { sig: 'signature1' },
      '456': { sig: 'signature2', pubKey: 'pubKey2' },
    });

    await expect(promise).resolves.toEqual([
      { ...transactions[0], sigs: [{ sig: 'signature1' }] },
      { ...transactions[1], sigs: [{ sig: 'signature2' }] },
    ]);
  });

  it('throws when signing multiple transactions', async () => {
    const transactions: IUnsignedCommand[] = [
      { hash: '123', cmd: '{"code": "test1"}', sigs: [] },
      { hash: '456', cmd: '{"code": "test2"}', sigs: [] },
    ];
    const promise = sign(transactions);

    await expect(promise).rejects.toThrow(
      'Currently Kadena SpireKey only supports signing one transaction at a time',
    );
  });

  it('handles a timeout correctly', async () => {
    vitest.useFakeTimers();
    const transaction: IUnsignedCommand = {
      hash: '123',
      cmd: 'test',
      sigs: [],
    };
    const promise = sign(transaction);

    vitest.advanceTimersByTime(5 * 60 * 1000);

    await expect(promise).rejects.toEqual([
      new Error('Timeout: Signing took too long'),
    ]);
  });
});
