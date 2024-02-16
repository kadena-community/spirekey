import { customTokens } from '@/styles/tokens.css';
import { style } from '@vanilla-extract/css';

export const maxButton = style({
  paddingBlock: '0',
  paddingInline: '2px',
});

export const maxButtonText = style({
  fontSize: '0.75rem',
  lineHeight: 1,
});

export const balanceText = style({
  fontSize: '0.75rem',
  color: customTokens.color.white,
});
