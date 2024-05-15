import Registration from '@/components/Registration/Registration';
import React from 'react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
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
    it.skip('asks a user to create a passkey', () => {
      renderRegistration();
      expect(
        screen.getByText('Create your account with a Passkey'),
      ).toBeInTheDocument();
    });
    it.skip('asks for a passkey', () => {
      renderRegistration();
      expect(screen.getByText('Tap to continue')).toBeInTheDocument();
    });
  });
});
