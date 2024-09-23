import { style } from '@kadena/kode-ui';
import { responsiveStyle } from '@kadena/kode-ui/styles';

export const passkeyWrapperClass = style({
  width: '80%',
  ...responsiveStyle({
    sm: {
      width: '70%',
    },
    md: {
      width: '60%',
    },
  }),
});
