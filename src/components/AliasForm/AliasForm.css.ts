import { responsiveStyle } from '@kadena/react-ui/styles';
import { style } from '@vanilla-extract/css';

export const form = style({
  ...responsiveStyle({
    xs: {
      width: '100%',
    },
    sm: {
      width: '80%',
    },
    md: {
      width: '70%',
    },
    lg: {
      width: '60%',
    },
    xl: {
      width: '40%',
    },
    xxl: {
      width: '30%',
    },
  }),
});
