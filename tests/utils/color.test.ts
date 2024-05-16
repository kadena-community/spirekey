import { hexadecimalToRGB } from '@/utils/color';
import { describe, expect, it } from 'vitest';

describe('color', () => {
  describe('hexadecimalToRGB', () => {
    it('transforms black', async () => {
      expect(hexadecimalToRGB('#000000')).toEqual({ r: 0, g: 0, b: 0 });
    });

    it('transforms white', async () => {
      expect(hexadecimalToRGB('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 });
    });
  });
});
