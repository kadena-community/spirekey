import { responsiveStyle } from '@kadena/react-ui/styles';
import { style } from '@vanilla-extract/css';

export const link = style({
  display: 'none! important',
  ...responsiveStyle({
    md: {
      display: 'block! important',
    },
  }),
});
