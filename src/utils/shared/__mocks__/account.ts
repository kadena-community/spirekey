import { vi } from 'vitest';

const getAccountFrom = vi.fn().mockResolvedValue({
  accountName: 'testAccount',
  networkId: 'development',
  chainIds: ['1'],
  balance: '0',
  devices: [],
  minApprovals: 1,
  minRegistrationApprovals: 1,
});

export { getAccountFrom };
