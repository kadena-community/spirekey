import { SpireKeySpinner } from '@/components/Spinners/SpireKeySpinner';
import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { screen } from '../setup';

describe('SpireKeySpinner', () => {
  describe('When showing the SpireKeySpinner component', () => {
    it('has seven light beams', () => {
      render(<SpireKeySpinner />);
      expect(screen.getByRole('status').childElementCount).toBe(7);
    });
  });
});
