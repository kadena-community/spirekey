import { atoms } from '@kadena/kode-ui/styles';
import { globalStyle, style } from '@vanilla-extract/css';

export const container = style([
  atoms({
    padding: 'md',
    position: 'fixed',
  }),
  {
    zIndex: 999999,
  },
]);

globalStyle(`${container} button`, {
  flexShrink: 0,
});

//TODO add proper bg styling
globalStyle(`${container} [role="alert"]`, {
  background: 'rgb(105 81 0 / 80%)',
});
