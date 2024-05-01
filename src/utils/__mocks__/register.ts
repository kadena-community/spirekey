import { vi } from 'vitest';

const getAccountName = vi.fn().mockResolvedValue('testAccount');
const getWebAuthnPubkeyFormat = vi.fn().mockReturnValue('testPubKey');
const registerAccountOnChain = vi
  .fn()
  .mockImplementation(({ chainId, networkId }) => {
    return Promise.resolve({
      requestKey: 'test-request-key',
      chainId,
      networkId,
    });
  });

export { getAccountName, getWebAuthnPubkeyFormat, registerAccountOnChain };
