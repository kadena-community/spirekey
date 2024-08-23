import { token } from '@kadena/kode-ui/styles';
import { style } from '@vanilla-extract/css';

export const networkLabel = style({
  borderColor: token('color.icon.base.@disabled'),
  color: token('color.icon.base.@disabled'),
  cursor: 'pointer',
  borderStyle: 'solid',
  borderWidth: 'thin',
  borderRadius: token('radius.sm'),
  backgroundColor: token('color.background.layer.default'),
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
  paddingInline: token('spacing.lg'),
  paddingBlock: token('spacing.md'),
  gap: token('spacing.sm'),
  selectors: {
    [`&[data-selected]&`]: {
      backgroundColor: token('color.brand.primary.n0'),
      color: token('color.background.accent.primary.inverse.default'),
    },
  },
});
export const networkLabelText = style({
  fontSize: token('typography.fontSize.sm'),
  selectors: {
    [`${networkLabel}[data-selected] &`]: {
      color: token('color.text.base.@focus'),
    },
  },
});
