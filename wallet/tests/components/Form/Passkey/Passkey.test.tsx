import Passkey from '@/components/Form/Passkey/Passkey';
import React from 'react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import MatchMediaMock from 'vitest-matchmedia-mock';
import { cleanup, render, screen } from '../../setup';

describe('Passkey', () => {
  let matchMediaMock = new MatchMediaMock();
  beforeAll(() => {
    matchMediaMock.useMediaQuery('(prefers-color-scheme: dark)');
  });
  afterEach(() => cleanup());
  describe('When showing the Passkey component', () => {
    const onClick = vi.fn();
    const renderPasskey = () => {
      render(<Passkey isInProgress={false} onClick={onClick} />);
    };
    it('asks a user to create a passkey', () => {
      renderPasskey();
      expect(
        screen.getByText('Create your account with a Passkey'),
      ).toBeInTheDocument();
    });
    it('handles clicks', () => {
      renderPasskey();
      screen.getByText('Tap to continue').click();
      expect(onClick).toHaveBeenCalledOnce();
    });
  });
  describe('When showing the Passkey component as "in progress"', () => {
    it('informs the user that Passkey creation is in progress', () => {
      render(<Passkey isInProgress={true} onClick={vi.fn()} />);
      expect(
        screen.getByText('Your account is being created'),
      ).toBeInTheDocument();
    });
  });
});
