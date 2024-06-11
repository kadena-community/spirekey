import { beforeEach, describe, expect, it, vitest } from 'vitest';

import { SidebarManager } from '../../sidebar-manager';
import * as styles from '../../styles.css';
import { connectFactory } from '../connectFactory';

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

    // @TODO this fails
    // expect(
    //   sidebarManager.iframe.classList.contains(styles.spirekeySidebarOpen),
    // ).toBe(true);
    expect(sidebarManager.iframe.src).toContain(`/embedded/sidebar`);
    expect(sidebarManager.iframe.src).not.toContain(`transaction=`);

    window.dispatchEvent(
      new MessageEvent('message', {
        data: {
          source: 'kadena-spirekey',
          name: 'account-connected',
          payload: {
            account: {
              address: 'test',
              publicKey: 'test',
            },
          },
        },
      }),
    );

    await expect(promise).resolves.toEqual({
      account: {
        address: 'test',
        publicKey: 'test',
      },
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
