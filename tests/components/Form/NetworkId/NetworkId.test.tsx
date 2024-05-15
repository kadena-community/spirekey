import NetworkId from '@/components/Form/NetworkId/NetworkId';
import React from 'react';
import { useForm } from 'react-hook-form';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import MatchMediaMock from 'vitest-matchmedia-mock';
import { cleanup, render, renderHook, screen } from '../../setup';

describe('NetworkId', () => {
  let matchMediaMock = new MatchMediaMock();
  beforeAll(() => {
    matchMediaMock.useMediaQuery('(prefers-color-scheme: dark)');
  });
  afterEach(() => cleanup());
  describe('When showing the NetworkId component', () => {
    const networkId = 'development';
    const defaultValues = { networkId };

    const { result } = renderHook(() => useForm({ defaultValues }));
    const methods = result.current;
    const {
      register,
      formState: { errors },
    } = methods;

    const renderNetworkId = () => {
      render(
        <NetworkId
          register={register}
          name="networkId"
          error={errors.networkId}
          networkId={networkId}
        />,
      );
    };
    it('preselects a NetworkId', () => {
      renderNetworkId();
      expect(screen.getByLabelText('Devnet')).toBeChecked();
    });
    it('allows users to change the NetworkId', () => {
      renderNetworkId();
      screen.getByLabelText('Mainnet').click();
      expect(screen.getByLabelText('Devnet')).not.toBeChecked();
      expect(screen.getByLabelText('Mainnet')).toBeChecked();
    });
  });
});
