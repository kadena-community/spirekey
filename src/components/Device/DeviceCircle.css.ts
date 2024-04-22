import { style } from '@vanilla-extract/css';

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
