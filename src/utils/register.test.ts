import { genesisPrivateKey, genesisPubKey } from '@/utils/constants';
import { ChainId } from '@kadena/client';
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { mockL1Client } from '../../tests/components/test-mocks';
import {
  getAccountName,
  getWebAuthnPubkeyFormat,
  registerAccountOnChain,
} from './register';
import { l1Client } from './shared/client';

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

      expect(mockL1Client.local).toHaveBeenCalledWith(
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
        deviceType: 'mobile',
        domain: 'kadena.network',
        credentialId: '1',
        credentialPubkey: genesisPubKey,
        networkId: 'testnet',
      });

      expect(mockL1Client.local).toHaveBeenCalledWith(
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
