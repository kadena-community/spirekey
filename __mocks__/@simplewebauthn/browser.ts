import { vi } from 'vitest';

const startRegistration = vi.fn().mockReturnValue({
  response: {
    publicKey: 'bW9ja2VkLXdlYmF1dGhuLWtleQ==',
    attestationObject: 'fakedata',
  },
});

const { base64URLStringToBuffer, bufferToBase64URLString } =
  await vi.importActual<typeof import('@simplewebauthn/browser')>(
    '@simplewebauthn/browser',
  );

export { base64URLStringToBuffer, bufferToBase64URLString, startRegistration };
