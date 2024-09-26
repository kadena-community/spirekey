import { Account } from '@kadena/spirekey-types';
import { getPubkey, getSubtitle } from '../utils';

describe('Embedded utils', () => {
  describe('getSubtitle', () => {
    it('should return the title that shows the size if size > 1', () => {
      expect(getSubtitle(5)).toEqual('asked for the following 5 modules');
    });
    it('should return the title that NOT shows the size when size < 1 ', () => {
      expect(getSubtitle(1)).toEqual('asked for the following module');
      expect(getSubtitle(0)).toEqual('asked for the following module');
    });
  });

  describe('getPubKey', () => {
    const accounts = [
      {
        accountName: 'r:he-man',
        guard: {
          keysetref: {},
        },
        networkId: 'development',
        alias: 'SpireKey Account 17',
        chainIds: [],
        devices: [
          {
            guard: {
              pred: 'keys-any',
              keys: ['WEBAUTHN-he-man'],
            },
            'credential-id': 'he-man',
          },
        ],
        txQueue: [],
        balance: '0',
        keyset: {
          pred: 'keys-any',
          keys: ['WEBAUTHN-123', '123'],
        },
      },
      {
        accountName: 'r:skeletor',
        guard: {
          keysetref: {},
        },
        networkId: 'development',
        alias: 'SpireKey Account 21',
        chainIds: [],
        minApprovals: 1,
        minRegistrationApprovals: 1,
        devices: [
          {
            guard: {
              pred: 'keys-any',
              keys: ['WEBAUTHN-skeletor'],
            },
            'credential-id': 'skeletor',
          },
        ],
        txQueue: [],
        balance: '0',
        keyset: {
          pred: 'keys-any',
          keys: ['456', 'WEBAUTHN-456'],
        },
      },
    ] as unknown as Account[];

    it('should return the the correct pubKey', () => {
      const credentialId = 'he-man';

      expect(getPubkey(accounts, credentialId)).toEqual('WEBAUTHN-he-man');
    });

    it('should throw when pubkey not found in any account', () => {
      const credentialId = 'Orko';

      expect(() => getPubkey(accounts, credentialId)).toThrowError(
        'No public key found',
      );
    });
  });
});
