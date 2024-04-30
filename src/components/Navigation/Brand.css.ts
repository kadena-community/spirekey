import { responsiveStyle } from '@kadena/react-ui/styles';
import { style } from '@vanilla-extract/css';

export const logo = style({
  height: '32px',
  width: 'auto',
  paddingInlineStart: '0.25rem',
  ...responsiveStyle({
    md: {
      paddingInlineStart: '1rem',
    },
  }),
});

export const hamburger = style({
  marginInlineStart: '0.75rem! important',
  ...responsiveStyle({
    md: {
      display: 'none! important',
    },
  }),
});
