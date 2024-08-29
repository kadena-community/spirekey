import { atoms } from '@kadena/kode-ui/styles';
import { style } from '@vanilla-extract/css';

export const codeFont = style([
  atoms({
    fontFamily: 'monospaceFont',
    color: 'text.base.inverse.default',
  }),
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
    fontWeight: 'primaryFont.bold',
    color: 'text.base.inverse.default',
  }),
]);
