import { style } from '@vanilla-extract/css';

export const input = style({
  display: 'none',
});

export const device = style({
  width: '3rem',
  height: '3rem',
  padding: '0.75rem',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
});

export const selected = style({
  position: 'absolute',
  width: '100%',
  height: '100%',
  border: '3px solid white',
  borderRadius: 'inherit',
});
