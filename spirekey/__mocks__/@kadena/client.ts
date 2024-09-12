import type { ICommandResult, ITransactionDescriptor } from '@kadena/client';

const response = {
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
};

export const successResponse: ICommandResult = {
  ...response,
  result: { status: 'success', data: {} },
};

export const errorResponse: ICommandResult = {
  ...response,
  result: { status: 'failure', error: {} },
};

const submitResponse: ITransactionDescriptor = {
  requestKey: 'test-request-key',
  chainId: '1',
  networkId: 'development',
};

const l1Client = {
  local: vi.fn().mockResolvedValue(successResponse),
  listen: vi.fn().mockResolvedValue(successResponse),
  pollOne: vi.fn().mockResolvedValue(successResponse),
  submit: vi.fn().mockResolvedValue(submitResponse),
};

module.exports =
  await vi.importActual<typeof import('@kadena/client')>('@kadena/client');

export const createClient = () => l1Client;
