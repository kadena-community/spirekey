import { style } from '@kadena/kode-ui';
import { atoms, responsiveStyle } from '@kadena/kode-ui/styles';

export const overviewWrapperClass = style({
  flex: '50%',
  flexWrap: 'wrap',
});

export const backButtonClass = style([
  {
    display: 'block',
  },
  responsiveStyle({
    md: {
      display: 'none!important',
    },
  }),
]);
export const backButtonDesktopClass = style([
  atoms({ position: 'absolute', left: 0, color: 'text.gray.default' }),
]);
