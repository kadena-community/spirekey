import { atoms } from '@kadena/react-ui/styles';
import { globalStyle, style } from '@vanilla-extract/css';

export const container = style([
  atoms({
    padding: 'md',
    position: 'fixed',
    height: '100%',
  }),
  {
    zIndex: 9999,
  },
]);

export const discordChannel = style({
  whiteSpace: 'nowrap',
});

globalStyle(`${container} button`, {
  flexShrink: 0,
});
