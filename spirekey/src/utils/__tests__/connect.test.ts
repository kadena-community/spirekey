import type { Account } from '@kadena/spirekey-types';
import { getUser, User } from '../connect';

describe('connect', () => {
  describe('getUser', () => {
    it('should return the correct user object from an account object', () => {
      const account: Account = {
        alias: 'He-man',
        accountName: 'r:m4ster0fth3Un1v3rs3',
        minApprovals: 1,
        minRegistrationApprovals: 1,
        balance: '123.456',
        devices: [
          {
            guard: {
              pred: 'keys-any',
              keys: ['WEBAUTHN-123'],
            },
            color: '#893DE7',
            domain: 'https://spirekey.kadena.io',
            'credential-id': 'skeletor',
            deviceType: 'desktop',
          },
          {
            guard: {
              pred: 'keys-any',
              keys: ['WEBAUTHN-890'],
            },
            color: '#893DE7',
            domain: 'https://spirekey.kadena.io',
            'credential-id': 'cringer',
            deviceType: 'desktop',
          },
        ],
        guard: {
          keysetref: {
            ns: 'n_123',
            ksn: 'kadena',
          },
        },
        networkId: 'testnet04',
        chainIds: ['17', '18'],
        txQueue: [
          {
            requestKey: 'power sword',
            chainId: '17',
            networkId: 'testnet04',
          },
          {
            requestKey: 'prince_adam',
            chainId: '18',
            networkId: 'testnet04',
          },
        ],
        requestedFungibles: [],
      };

      const expectedResult: User = {
        alias: 'He-man',
        accountName: 'r:m4ster0fth3Un1v3rs3',
        pendingTxIds: [],
        credentials: [
          {
            type: 'WebAuthn',
            publicKey: 'WEBAUTHN-123',
            id: 'skeletor',
          },
        ],
      };

      const result = getUser(account);
      expect(result).toEqual(expectedResult);
    });
  });
});
