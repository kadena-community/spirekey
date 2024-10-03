import { style } from '@kadena/kode-ui';
import { responsiveStyle } from '@kadena/kode-ui/styles';
import { globalStyle } from '@vanilla-extract/css';

export const layoutWrapperClass = style([
  {
    width: '100%',
    marginInline: 'auto',
    minHeight: '100dvh',
  },
  responsiveStyle({
    md: {
      width: '42rem',
    },
  }),
]);

globalStyle(`${layoutWrapperClass} [class*="CardPattern"]`, {
  width: '100%',
});
