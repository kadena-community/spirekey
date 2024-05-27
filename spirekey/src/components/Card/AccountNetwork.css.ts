import { atoms } from '@kadena/react-ui/styles';
import { style } from '@vanilla-extract/css';

export const codeFont = style([
  atoms({
    fontFamily: 'monospaceFont',
  }),
  { color: 'black', fontSize: 'clamp(.9rem, 5vw, 1.5rem)' },
]);

export const account = style([
  codeFont,
  atoms({ fontWeight: 'monospaceFont.bold' }),
]);

export const namespace = style([
  atoms({ fontWeight: 'monospaceFont.regular' }),
  {
    fontFamily: 'inherit',
    opacity: 0.6,
  },
]);

export const copyButton = style([
  atoms({
    padding: 'md',
  }),
  {
    background: 'none',
    border: 'none',
  },
]);

export const network = style([
  atoms({
    fontWeight: 'primaryFont.regular',
  }),
  {
    fontSize: 'clamp(.75rem, 4vw, 1.125rem) !important', // doesn't work without important  ¯\_(ツ)_/¯
    color: 'black',
  },
]);
