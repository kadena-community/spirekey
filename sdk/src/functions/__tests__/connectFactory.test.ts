import { beforeEach, describe, expect, it, vitest } from 'vitest';

import * as styles from '../../styles.css';
import { connectFactory } from '../connectFactory';

describe('connectFactory', () => {
  let connect: ReturnType<typeof connectFactory>;
  let iframe = document.createElement('iframe');
  iframe.src = 'http://localhost:1337/embedded/sidebar';

  beforeEach(() => {
    iframe = document.createElement('iframe');
    iframe.src = 'http://localhost:1337/embedded/sidebar';

    connect = connectFactory({
      iframe,
      hideSidebar: () => {},
    });
  });

  it('connects an account', async () => {
    const promise = connect();

    expect(iframe.classList.contains(styles.spirekeySidebarOpened)).toBe(true);
    expect(iframe.src).toContain(`/embedded/sidebar`);
    expect(iframe.src).not.toContain(`transaction=`);

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
