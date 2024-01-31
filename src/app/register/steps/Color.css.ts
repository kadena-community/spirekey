import { globalStyle, style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(1.5rem, 1fr))',
  gridAutoRows: 'auto',
});

export const input = style({
  display: 'none',
});

export const color = style({
  width: '1.5rem',
  height: '1.5rem',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const selected = style({
  width: '40%',
  height: '40%',
  background: 'white',
  borderRadius: 'inherit',
});
