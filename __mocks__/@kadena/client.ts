import { vi } from 'vitest';

export const mockL1Client = {
  local: vi.fn().mockResolvedValue({
    result: { status: 'success', data: {} },
    reqKey: 'test-request-key',
    gas: 700,
    logs: 'abc',
    continuation: null,
    txId: 1,
    metaData: {
      blockHash: 'abc',
      blockTime: 123,
      blockHeight: 123,
      prevBlockHash: 'abc',
    },
  }),
  listen: vi.fn().mockResolvedValue({
    result: { status: 'success', data: {} },
  }),
  submit: vi.fn().mockResolvedValue({
    result: { status: 'success', data: {} },
  }),
};
