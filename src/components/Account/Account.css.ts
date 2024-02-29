import { style } from '@vanilla-extract/css';

export const detailLink = style({
  color: 'rgba(255, 255, 255, 0.6)',
  fontSize: '0.9rem',
});

export const accountButtonWrapper = style({
  gridTemplateColumns: 'repeat(auto-fit, minmax(3rem, 1fr))',
  marginInline: 'auto',
  paddingInline: '0.5rem',
});
