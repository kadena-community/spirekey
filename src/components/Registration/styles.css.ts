import { customTokens } from '@/styles/tokens.css';
import { atoms } from '@kadena/react-ui/styles';
import { globalStyle, style } from '@vanilla-extract/css';

export const wrapper = style({
  position: 'relative',
  overflow: 'hidden',
});

export const container = style({
  display: 'flex',
});

export const step = style([
  atoms({
    paddingInline: 'lg',
  }),
  {
    width: '100%',
    flexShrink: '0',
  },
]);

export const descriptionEmphasis = style({
  color: customTokens.color.accent,
  fontWeight: '700',
});

export const itemContainer = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
});

globalStyle(`${itemContainer} input`, {
  display: 'none',
});

export const item = style({
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

globalStyle(`input:checked + ${item}`, {
  color: customTokens.color.accent,
});
