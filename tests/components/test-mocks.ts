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
