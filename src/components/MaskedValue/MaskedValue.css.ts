import { atoms } from '@kadena/react-ui/styles';
import { style } from '@vanilla-extract/css';

export const valueContainer = style([
  atoms({
    fontFamily: 'codeFont',
    fontWeight: 'monoFont.bold',
  }),
  {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: 'black',
  },
]);
