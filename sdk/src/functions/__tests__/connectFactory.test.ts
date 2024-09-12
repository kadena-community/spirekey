import { connect } from '../connectFactory';
import { publishEvent } from '../events';

vitest.stubGlobal('open', vi.fn());

describe('connectFactory', () => {
  it('connects an account', async () => {
    const promise = connect('development', '15');

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

    await expect(promise).resolves.toMatchObject({
      accountName: 'test',
      alias: 'test',
      minApprovals: 0,
      minRegistrationApprovals: 0,
      balance: '4',
      devices: [],
      networkId: 'mainnet01',
      chainIds: ['0', '18'],
    });

    const { isReady, account } = await promise;
    const isReadyPromise = isReady();

    publishEvent('isReady', account);

    await expect(isReadyPromise).resolves.toBeTruthy();
  });

  it('handles a timeout correctly', async () => {
    vitest.useFakeTimers();
    const promise = connect('development', '18');

    vitest.advanceTimersByTime(5 * 60 * 1000);

    await expect(promise).rejects.toEqual([
      new Error('Timeout: Connecting took too long'),
    ]);
  });
});
