import { SpireKeySpinner } from '@/components/Spinners/SpireKeySpinner';
import React from 'react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import MatchMediaMock from 'vitest-matchmedia-mock';
import { cleanup, render, screen } from '../setup';

describe('SpireKeySpinner', () => {
  let matchMediaMock = new MatchMediaMock();
  beforeAll(() => {
    matchMediaMock.useMediaQuery('(prefers-color-scheme: dark)');
  });
  afterEach(() => cleanup());
  describe('When showing the SpireKeySpinner component', () => {
    const renderSpireKeySpinner = () => {
      render(<SpireKeySpinner />);
    };
    it('has seven light beams', () => {
      renderSpireKeySpinner();
      expect(screen.getByRole('status').childElementCount).toBe(7);
    });
  });
});
