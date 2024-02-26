import { style } from '@vanilla-extract/css';

export const wrapper = style({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  gap: 8,
  alignItems: 'center',
});

export const product = style({
  borderRadius: '50%',
  height: 50,
  width: 50,
  border: '1px solid white',
  objectFit: 'cover',
  objectPosition: 'center',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
