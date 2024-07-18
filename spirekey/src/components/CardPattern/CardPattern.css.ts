import { atoms, responsiveStyle, token } from '@kadena/kode-ui/styles';
import { style, styleVariants } from '@vanilla-extract/css';

export const container = style([
  atoms({
    borderRadius: 'md',
    padding: 'xl',
    backgroundColor: 'layer.default',
  }),
  {
    ...responsiveStyle({
      md: {
        border: token('border.hairline'),
        width: '42rem',
        marginInlineStart: '50%',
        transform: 'translateX(-50%)',
        marginBlock: token('size.n30'),
      },
    }),
  },
]);

export const bodyContent = style([
  { marginBlockStart: token('spacing.xl'), flex: 1.5 },
  {
    ...responsiveStyle({
      md: {
        marginBlockStart: token('size.n25'),
      },
    }),
    selectors: {
      "&[data-layout='no-visual']": responsiveStyle({
        md: {
          marginBlockStart: token('size.n10'),
        },
      }),
    },
  },
]);
