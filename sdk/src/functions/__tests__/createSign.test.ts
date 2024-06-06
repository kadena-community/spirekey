import { IUnsignedCommand } from '@kadena/client';
import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { createSign } from '../createSign';

describe('signFactory', () => {
  let sign: ReturnType<typeof createSign>;
  let iframe = document.createElement('iframe');

  beforeEach(() => {
    iframe = document.createElement('iframe');
    sign = createSign({
      hostUrl: 'http://localhost:1337',
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

    expect(iframe.classList.contains('spirekey-sidebar-opened')).toBe(true);
    expect(iframe.src).toContain(`/embedded/sidebar/#transaction=`);

    window.dispatchEvent(
      new MessageEvent('message', {
        data: {
          name: 'signed-all',
          payload: { signatures: { '123': 'signature' } },
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

    expect(iframe.src).toContain(`/embedded/sidebar/#transaction=`);

    window.dispatchEvent(
      new MessageEvent('message', {
        data: {
          name: 'signed-all',
          payload: { signatures: { '123': 'signature1', '456': 'signature2' } },
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
      new Error('Timeout: Signing process took too long'),
    ]);
  });
});
