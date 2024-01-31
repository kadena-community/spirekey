import { createGlobalTheme } from '@vanilla-extract/css';

export const deviceColors = {
  purple: '#893DE7',
  pink: '#C82269',
  red: '#D31510',
  yellow: '#E8C600',
  green: '#AAD816',
  blue: '#0265DC',
};

export const customTokens = createGlobalTheme(':root', {
  color: {
    accent: '#58BD9C',
    surface: 'rgba(147, 147, 147, 0.10)',
    forgroundSurface: 'rgba(147, 147, 147, 0.30)',
    border: 'white',
    buttonText: 'rgba(255, 255, 255, 0.60)',
    device: deviceColors,
  },
});
