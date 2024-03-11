import { customTokens } from '@/styles/shared/tokens.css';
import { style } from '@vanilla-extract/css';

export const button = style({
  paddingBlock: '0',
  paddingInline: '2px',
});

export const buttonText = style({
  fontSize: '0.75rem',
  lineHeight: 1,
  textTransform: 'uppercase',
});

export const balanceText = style({
  fontSize: '0.75rem',
  color: customTokens.color.white,
});
