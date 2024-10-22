import { countWithPrefixOnDomain } from '@/utils/countAccounts';

const accounts = [
  {
    accountName: 'c:account',
    networkId: 'development',
    alias: 'SpireKey Account 1',
    minApprovals: 1,
    minRegistrationApprovals: 1,
    balance: '100',
    devices: [
      {
        guard: {
          pred: 'keys-any' as const,
          keys: ['WEBAUTHN-key'],
        },
        domain: 'https://example.com',
        'credential-id': 'credential-id',
        name: 'security-key_#893DE7',
        color: '',
        deviceType: '',
      },
    ],
    chainIds: ['14' as const],
  },
  {
    accountName: 'c:account',
    networkId: 'development',
    alias: 'SpireKey Account 1',
    minApprovals: 1,
    minRegistrationApprovals: 1,
    balance: '100',
    devices: [
      {
        guard: {
          pred: 'keys-any' as const,
          keys: ['WEBAUTHN-key'],
        },
        domain: 'https://chainweaver.kadena.io',
        'credential-id': 'credential-id',
        name: 'security-key_#893DE7',
        color: '',
        deviceType: '',
      },
    ],
    chainIds: ['14' as const],
  },
];

describe('countAccounts', () => {
  describe('countWithPrefixOnDomain', () => {
    it('returns 0 when there are no accounts', async () => {
      expect(countWithPrefixOnDomain([], '', '')).toBe(0);
    });

    it('returns 1 when an account with prefix exists with a device registered on the domain', async () => {
      expect(
        countWithPrefixOnDomain(
          accounts,
          'SpireKey Account',
          'https://chainweaver.kadena.io',
        ),
      ).toBe(1);
    });

    it('excludes an account name', async () => {
      expect(
        countWithPrefixOnDomain(
          accounts,
          'SpireKey Account',
          'https://chainweaver.kadena.io',
          'SpireKey Account',
        ),
      ).toBe(0);
    });
  });
});
