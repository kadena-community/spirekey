import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import {
  getAccountName,
  getWebAuthnPubkeyFormat,
  registerAccountOnChain,
} from '../../src/utils/register';

import { l1Client } from '../../src/utils/shared/client';

vi.mock('@kadena/client');

describe('register utils', () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2019-10-30'));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  describe('getAccountName()', async () => {
    it('calls local with the correct parameters', async () => {
      await getAccountName(
        '368820f80c324bbc7c2b0610688a7da43e39f91d118732671cd9c7500ff43cca',
        'testnet04',
        '1',
      );

      expect(l1Client.local).toHaveBeenCalledWith(
        expect.objectContaining({
          cmd: expect.stringContaining('get-account-name account'),
          hash: 'EYdRyroG1fY4DxxaEMKWZ9cRUFUG6-ffzdjX0osQ2Vk',
          sigs: [],
        }),
        { preflight: false, signatureVerification: false },
      );
    });
  });

  describe('registerAccountOnChain()', () => {
    it('calls local with the correct parameters', async () => {
      await registerAccountOnChain({
        accountName: 'testAccount',
        chainId: '1',
        color: 'blue',
        deviceType: 'phone',
        domain: 'kadena.network',
        credentialId: '1',
        credentialPubkey:
          '368820f80c324bbc7c2b0610688a7da43e39f91d118732671cd9c7500ff43cca',
        networkId: 'testnet',
      });

      expect(l1Client.local).toHaveBeenCalledWith(
        expect.objectContaining({
          cmd: expect.stringContaining('get-account-name account'),
          hash: 'EYdRyroG1fY4DxxaEMKWZ9cRUFUG6-ffzdjX0osQ2Vk',
          sigs: [],
        }),
        { preflight: false, signatureVerification: false },
      );
    });
  });

  describe('getWebAuthnPubkeyFormat()', () => {
    describe('returns the correct format', () => {
      it('for an unformatted key', () => {
        const formattedPubkey = getWebAuthnPubkeyFormat(
          '368820f80c324bbc7c2b0610688a7da43e39f91d118732671cd9c7500ff43cca',
        );
        expect(formattedPubkey).toEqual(
          'WEBAUTHN-368820f80c324bbc7c2b0610688a7da43e39f91d118732671cd9c7500ff43cca',
        );
      });

      it('for a formatted key', () => {
        const formattedPubkey = getWebAuthnPubkeyFormat(
          'WEBAUTHN-368820f80c324bbc7c2b0610688a7da43e39f91d118732671cd9c7500ff43cca',
        );
        expect(formattedPubkey).toEqual(
          'WEBAUTHN-368820f80c324bbc7c2b0610688a7da43e39f91d118732671cd9c7500ff43cca',
        );
      });
    });
  });
});
