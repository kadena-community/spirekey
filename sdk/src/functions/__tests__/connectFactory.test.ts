import { beforeEach, describe, expect, it, vitest } from 'vitest';

import { SidebarManager } from '../../embed-manager';
import * as styles from '../../styles.css';
import { connectFactory } from '../connectFactory';
import { publishEvent } from '../events';

describe('connectFactory', () => {
  let connect: ReturnType<typeof connectFactory>;
  let sidebarManager = new SidebarManager('http://localhost:1337');

  beforeEach(() => {
    sidebarManager = new SidebarManager('http://localhost:1337');
    connect = connectFactory({
      sidebarManager,
    });
  });

  it('connects an account', async () => {
    const promise = connect();

    expect(
      sidebarManager.iframe.classList.contains(styles.spirekeySidebarOpen),
    ).toBe(true);
    expect(sidebarManager.iframe.src).toContain(`/embedded/sidebar`);
    expect(sidebarManager.iframe.src).not.toContain(`transaction=`);

    publishEvent('connected', {
      accountName: 'test',
      alias: 'test',
      minApprovals: 0,
      minRegistrationApprovals: 0,
      balance: '4',
      devices: [],
      networkId: 'mainnet01',
      chainIds: ['0', '18'],
    });

    await expect(promise).resolves.toEqual({
      accountName: 'test',
      alias: 'test',
      minApprovals: 0,
      minRegistrationApprovals: 0,
      balance: '4',
      devices: [],
      networkId: 'mainnet01',
      chainIds: ['0', '18'],
    });
  });

  it('handles a timeout correctly', async () => {
    vitest.useFakeTimers();
    const promise = connect();

    vitest.advanceTimersByTime(5 * 60 * 1000);

    await expect(promise).rejects.toEqual([
      new Error('Timeout: Connecting took too long'),
    ]);
  });
});
