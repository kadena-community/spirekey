import { keyframes, style } from '@vanilla-extract/css';

export const productImage = style({
  width: '3rem',
  height: 'auto',
});

const rotate = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const loader = style({
  animation: `${rotate} 3s linear infinite`,
});
