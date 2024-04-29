import { style } from '@vanilla-extract/css';

export const productImage = style({
  width: '100%',
  height: 'auto',
});

export const orderItemAmount = style({
  fontWeight: 'bold',
  fontSize: '1.25rem',
  marginBlockStart: '0.125rem',
});

export const quantityButton = style({
  paddingBlock: '0.25rem',
  paddingInline: '0.5rem',
});
