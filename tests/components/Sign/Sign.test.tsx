import Sign from '@/components/Sign/Sign';
import { l1Client } from '@/utils/shared/client';
import React from 'react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import MatchMediaMock from 'vitest-matchmedia-mock';
import { cleanup, render, screen } from '../setup';
import { mockAccount } from './mockAccount';
import { mockTx } from './mockTx';

vi.mock('@kadena/client');

describe('Sign', () => {
  let matchMediaMock = new MatchMediaMock();
  beforeAll(() => {
    matchMediaMock.useMediaQuery('(prefers-color-scheme: dark)');
  });
  afterEach(() => cleanup());
  describe('When showing the user what they are about to sign for', () => {
    describe('And the account to sign for is stored in SpireKey', () => {
      it('should show what the user is signing for', () => {
        window.localStorage.setItem(
          'localAccounts',
          JSON.stringify(mockAccount),
        );

        render(
          <Sign
            useHash
            returnUrl="https://some.url/path"
            transaction={mockTx}
          />,
        );
        expect(
          screen.getByText(
            'Sign this transaction with the following credential: samSsQo2kizFNrLp_-hX_Q',
          ),
        ).toBeVisible();
      });
    });
    describe('And the account to sign for does not exist in this wallet', () => {
      it('should tell the user it cannot sign for this tx', () => {
        window.localStorage.setItem('localAccounts', JSON.stringify([]));

        render(
          <Sign
            useHash
            returnUrl="https://some.url/path"
            transaction={mockTx}
          />,
        );
        expect(
          screen.getByText('Redirecting you back to https://some.url/path'),
        ).toBeVisible();
      });
    });
  });
});
