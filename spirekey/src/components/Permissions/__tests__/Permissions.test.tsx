import React from 'react';
import MatchMediaMock from 'vitest-matchmedia-mock';

import { cleanup, render, screen } from '@/../tests/setup';
import { Permissions } from '@/components/Permissions/Permissions';
import { ICap } from '@kadena/types';

describe('Sign', () => {
  const matchMediaMock = new MatchMediaMock();
  beforeAll(() => {
    matchMediaMock.useMediaQuery('(prefers-color-scheme: dark)');
  });
  afterEach(() => cleanup());
  describe('When showing the user what they are about to sign for', () => {
    describe('And the account to sign for is stored in SpireKey', () => {
      it('should show what the user is signing for', () => {
        const capabilities: ICap[] = [
          {
            name: 'n_something.webauthn-wallet.CAP',
            args: ['hello'],
          },
        ];
        render(
          <Permissions
            module="n_something.webauthn-wallet"
            capabilities={capabilities}
          />,
        );
        expect(screen.getByText('webauthn-wallet')).toBeVisible();
        expect(screen.getByText('n_some*hing')).toBeVisible();
        expect(screen.getByText('CAP')).toBeVisible();
        expect(screen.getByText('hello')).toBeVisible();
      });
    });
  });
});
