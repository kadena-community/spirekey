import type { Account } from '@kadena/spirekey-types';
import { Mock, describe, expect, it, vi } from 'vitest';

import { deviceColors } from '@/styles/shared/tokens.css';
import { onConnectWith } from '@/utils/connect';
import { l1Client } from '@/utils/shared/client';

vi.mock('@kadena/client');

describe('connect', () => {
  describe('When connecting an account', () => {
    const account: Account = {
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
      chainIds: ["1"],
      networkId: 'development',
      accountName: 'c:account',
      minApprovals: 1,
      minRegistrationApprovals: 1,
    };

    describe('And an network error occures while retrieving account information', () => {
      it('should add a notification prompting an error', async () => {
        const addNotificationMock = vi.fn();
        const redirectMock = vi.fn();
        (l1Client.local as Mock).mockRejectedValue({});
        await expect(() =>
          onConnectWith({
            addNotification: addNotificationMock,
            redirect: redirectMock,
          })({
            account,
            url: new URL('http://dapp.com/returnUrl'),
            networkId: 'development',
            chainId: '8',
          })(),
        ).rejects.toThrowError('Network error');
        expect(addNotificationMock).toHaveBeenCalled();
        expect(redirectMock).not.toHaveBeenCalled();
      });
    });

    describe('And a account exists', () => {
      it('should not add a notification', async () => {
        // mock the response for an account to be received
        (l1Client.local as Mock).mockResolvedValue({
          result: {
            status: 'success',
            data: [
              {
                'min-registration-approvals': {
                  int: 1,
                },
                devices: [
                  {
                    guard: {
                      pred: 'keys-any',
                      keys: ['WEBAUTHN-pubkey'],
                    },
                    domain: 'https://spirekey.kadena.io',
                    'credential-id': 'fakecredid',
                    name: 'phone_#D31510 ',
                  },
                ],
                'min-approvals': {
                  int: 1,
                },
              },
              0,
            ],
          },
        });
        const addNotificationMock = vi.fn();
        const redirectMock = vi.fn();
        await onConnectWith({
          addNotification: addNotificationMock,
          redirect: redirectMock,
        })({
          account,
          url: new URL('http://dapp.com/returnUrl'),
          networkId: 'development',
          chainId: '8',
        })();
        expect(addNotificationMock).not.toHaveBeenCalled();
        expect(redirectMock).toHaveBeenCalledWith(
          'http://dapp.com/returnUrl?user=eyJhbGlhcyI6IkFsaWNlIiwiYWNjb3VudE5hbWUiOiJjOmFjY291bnQiLCJwZW5kaW5nVHhJZHMiOltdLCJjcmVkZW50aWFscyI6W3sidHlwZSI6IldlYkF1dGhuIiwicHVibGljS2V5IjoiV0VCQVVUSE4tcHVia2V5IiwiaWQiOiJmYWtlaWQifV19',
        );
      });
    });
  });
});
