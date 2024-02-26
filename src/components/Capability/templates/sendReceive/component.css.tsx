import { style } from '@vanilla-extract/css';

export const wrapper = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const avatar = style({
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
