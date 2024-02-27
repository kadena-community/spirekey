import { atoms } from '@kadena/react-ui/styles';
import { style } from '@vanilla-extract/css';

export const container = style([
  atoms({
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: -1,
  }),
  {
    height: '100%',
  },
]);
