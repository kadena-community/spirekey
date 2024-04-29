import { BiometricsForm } from '@/components/Registration/BiometricsForm';
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
  describe('When showing the BiometricsForm', () => {
    const formValues = {
      alias: '',
      color: '',
      networkId: 'development',
      usedAlias: '',
      deviceType: '',
      accountName: '',
      credentialId: '',
      credentialPubkey: '',
    };
    const renderEmptyForm = () => {
      render(
        <BiometricsForm
          isVisible
          stepIndex={0}
          formValues={formValues}
          navigation={{
            goTo: vi.fn(),
            next: vi.fn(),
            previous: vi.fn(),
          }}
          updateFields={vi.fn()}
          defaultValues={formValues}
        />,
      );
    };
    it('should should ask a user to create a passkey', () => {
      renderEmptyForm();
      expect(
        screen.getByText('Create your account by using Passkey'),
      ).toBeInTheDocument();
    });
    it('should ask for passkey', () => {
      renderEmptyForm();
      screen.getByText('Tap to continue').click();
      expect(startRegistration).toHaveBeenCalledOnce();
    });
  });
});
