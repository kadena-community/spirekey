import { atoms, responsiveStyle } from '@kadena/react-ui/styles';
import { style } from '@vanilla-extract/css';

export const container = style([
  atoms({
    paddingInline: 'md',
  }),
  {
    margin: '0 auto',
    ...responsiveStyle({
      xs: {
        maxWidth: '100%',
      },
      sm: {
        maxWidth: '40rem',
      },
      md: {
        maxWidth: '48rem',
      },
      lg: {
        maxWidth: '64rem',
      },
      xl: {
        maxWidth: '80rem',
      },
      xxl: {
        maxWidth: '96rem',
      },
    }),
  },
]);
