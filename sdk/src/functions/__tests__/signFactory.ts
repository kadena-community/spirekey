import { IUnsignedCommand } from '@kadena/client';
import { beforeEach, describe, expect, it, vitest } from 'vitest';

import * as styles from '../../styles.css';
import { signFactory } from '../signFactory';

describe('signFactory', () => {
  let sign: ReturnType<typeof signFactory>;
  let iframe = document.createElement('iframe');
  iframe.src = 'http://localhost:1337';

  beforeEach(() => {
    iframe = document.createElement('iframe');
    iframe.src = 'http://localhost:1337';
    sign = signFactory({
      iframe,
    });
  });

  it('signs a transaction', async () => {
    const transaction: IUnsignedCommand = {
      hash: '123',
      cmd: 'test',
      sigs: [],
    };
    const promise = sign(transaction);

    expect(iframe.classList.contains(styles.spirekeySidebarOpened)).toBe(true);
    expect(iframe.src).toContain(`/embedded/sidebar#transaction=`);

    window.dispatchEvent(
      new MessageEvent('message', {
        data: {
          source: 'kadena-spirekey',
          name: 'all-transactions-signed',
          payload: {
            transactions: [{ ...transaction, sigs: [{ sig: 'signature' }] }],
          },
        },
      }),
    );

    await expect(promise).resolves.toEqual([
      { ...transaction, sigs: [{ sig: 'signature' }] },
    ]);
  });

  it('signs multiple transactions', async () => {
    const transactions: IUnsignedCommand[] = [
      { hash: '123', cmd: 'test1', sigs: [] },
      { hash: '456', cmd: 'test2', sigs: [] },
    ];
    const promise = sign(transactions);

    expect(iframe.src).toContain(`/embedded/sidebar#transaction=`);

    window.dispatchEvent(
      new MessageEvent('message', {
        data: {
          name: 'all-transactions-signed',
          payload: {
            transactions: [
              { ...transactions[0], sigs: [{ sig: 'signature1' }] },
              { ...transactions[1], sigs: [{ sig: 'signature2' }] },
            ],
          },
        },
      }),
    );

    await expect(promise).resolves.toEqual([
      { ...transactions[0], sigs: [{ sig: 'signature1' }] },
      { ...transactions[1], sigs: [{ sig: 'signature2' }] },
    ]);
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
