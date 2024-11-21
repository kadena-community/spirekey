import { atoms, responsiveStyle } from '@kadena/kode-ui/styles';
import { globalStyle, style } from '@vanilla-extract/css';

export const container = style([
  atoms({
    marginInline: 'auto',
    marginBlockEnd: 'md',
  }),
  {
    position: 'relative',
    top: '0',
    left: '0',
    right: '0',
    width: '100%',
    zIndex: 9999,
  },
  responsiveStyle({
    md: {
      // position: 'absolute',
      width: '42rem',
    },
  }),
]);

export const discordChannel = style({
  whiteSpace: 'nowrap',
});

globalStyle(`${container} button`, {
  flexShrink: 0,
});

globalStyle(`${container} [role="alert"]`, {
  background: 'rgb(105 81 0 / 80%)',
});
