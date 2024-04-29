import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
vi.mock('next/navigation', () => {
  return require('next-router-mock');
});

vi.mock('@simplewebauthn/browser', async () => {
  const { base64URLStringToBuffer, bufferToBase64URLString } =
    await vi.importActual('@simplewebauthn/browser');
  return {
    base64URLStringToBuffer,
    bufferToBase64URLString,
    startRegistration: vi.fn().mockReturnValue({
      response: {
        publicKey: 'bW9ja2VkLXdlYmF1dGhuLWtleQ==',
        attestationObject: 'fakedata',
      },
    }),
  };
});

vi.mock('cbor', async () => {
  return {
    default: {
      decode: vi.fn().mockReturnValue({
        authData: new Array(100),
      }),
    },
  };
});

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
};

vi.mock('@kadena/client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@kadena/client')>();

  return {
    ...actual,
    createClient: () => mockL1Client,
  };
});
