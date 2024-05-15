import { deviceColors } from '@/styles/shared/tokens.css';
import { onConnect } from '@/utils/connect';
import { l1Client } from '@/utils/shared/client';
import { Mock, describe, expect, it, vi } from 'vitest';

vi.mock('@kadena/client');
describe('connect', () => {
  describe('When connecting an account', () => {
    describe('And a account exists', () => {
      it('should not add a notification', async () => {
        (l1Client.local as Mock).mockResolvedValue({});
        const addNotificationMock = vi.fn();
        await onConnect(addNotificationMock)({
          account: {
            alias: 'Alice',
            balance: '0.0',
            devices: [
              {
                color: deviceColors.darkGreen,
                deviceType: 'phone',
                domain: 'spirekey.kadena.io',
                'credential-id': 'fakeid',
                guard: {
                  keys: ['WEBAUTHN-pubkey'],
                  pred: 'keys-any',
                },
              },
            ],
            chainIds: [],
            networkId: 'development',
            accountName: 'c:account',
            minApprovals: 1,
            minRegistrationApprovals: 1,
          },
          url: 'http://dapp.com/returnUrl',
          networkId: 'development',
          chainId: '8',
        });
        expect(addNotificationMock).not.toHaveBeenCalled();
      });
    });
  });
});
