import { customTokens } from '@/styles/shared/tokens.css';
import { atoms } from '@kadena/react-ui/styles';
import { style } from '@vanilla-extract/css';

export const account = style([
  atoms({
    fontFamily: 'monospaceFont',
    fontWeight: 'primaryFont.bold',
  }),
  {
    color: customTokens.color.white,
  },
]);
