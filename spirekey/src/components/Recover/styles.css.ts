import { atoms, token } from '@kadena/kode-ui/styles';
import { style } from '@vanilla-extract/css';

export const networkInput = atoms({
  display: 'none',
});
export const networkLabel = style({
  borderColor: token('color.icon.base.@disabled'),
  color: token('color.icon.base.@disabled'),
  borderStyle: 'solid',
  borderWidth: 'thin',
  borderRadius: token('radius.sm'),
  backgroundColor: token('color.background.layer.default'),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingInline: token('spacing.lg'),
  paddingBlock: token('spacing.md'),
  gap: token('spacing.sm'),
  selectors: {
    [`${networkInput}:checked + &`]: {
      backgroundColor: token('color.brand.primary.n0'),
      color: token('color.background.accent.primary.inverse.default'),
    },
  },
});
export const networkLabelText = style({
  fontSize: token('typography.fontSize.sm'),
  selectors: {
    [`${networkInput}:checked + ${networkLabel} &`]: {
      color: token('color.text.base.@focus'),
    },
  },
});
