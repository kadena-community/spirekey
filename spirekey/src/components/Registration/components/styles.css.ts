import { style } from '@kadena/kode-ui';
import { responsiveStyle } from '@kadena/kode-ui/styles';

export const passkeyWrapperClass = style({
  width: '80vw',
  ...responsiveStyle({
    md: {
      width: '40vw',
    },
  }),
});
