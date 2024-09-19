import { atoms, globalStyle, responsiveStyle } from '@kadena/kode-ui/styles';
import { style } from '@vanilla-extract/css';

export const codeFont = style([
  atoms({
    fontFamily: 'monospaceFont',
    color: 'text.base.default',
  }),
]);

export const account = style([
  codeFont,
  atoms({ fontWeight: 'monospaceFont.bold', cursor: 'pointer' }),
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
    opacity: 1,
  }),
  {
    background: 'none',
    border: 'none',
  },
  responsiveStyle({
    md: {
      opacity: 0,
    },
  }),
]);

globalStyle(`${account}:hover ${copyButton}`, {
  opacity: '1 !important',
});
