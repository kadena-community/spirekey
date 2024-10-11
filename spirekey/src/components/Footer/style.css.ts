import { style } from '@kadena/kode-ui';
import { responsiveStyle, token } from '@kadena/kode-ui/styles';
import { globalStyle } from '@vanilla-extract/css';

export const footerClass = style({
  paddingInline: token('spacing.md'),
  marginBlockStart: token('spacing.sm'),
  paddingInlineEnd: token('spacing.md'),
  ...responsiveStyle({
    md: {
      // paddingInline: 0,
    },
  }),
});

globalStyle(`${footerClass} > *`, {
  opacity: '.4',
  color: token('color.text.gray.default'),
});
