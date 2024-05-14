import Registration from '@/components/Registration/Registration';
import { startRegistration } from '@simplewebauthn/browser';
import React from 'react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import MatchMediaMock from 'vitest-matchmedia-mock';
import { cleanup, render, screen } from './setup';

describe('Registration Form', () => {
  let matchMediaMock = new MatchMediaMock();
  beforeAll(() => {
    matchMediaMock.useMediaQuery('(prefers-color-scheme: dark)');
  });
  afterEach(() => cleanup());
  describe('When showing the Registration form', () => {
    const renderRegistration = () => {
      render(<Registration />);
    };
    it('should should ask a user to create a passkey', () => {
      renderRegistration();
      expect(
        screen.getByText('Create your account with a Passkey'),
      ).toBeInTheDocument();
    });
    it('should ask for passkey', () => {
      renderRegistration();
      screen.getByText('Tap to continue').click();
      expect(startRegistration).toHaveBeenCalledOnce();
    });
  });
});
