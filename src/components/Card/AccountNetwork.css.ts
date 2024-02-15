import { atoms } from '@kadena/react-ui/styles';
import { style } from '@vanilla-extract/css';

export const codeFont = style([
  atoms({
    fontFamily: 'codeFont',
  }),
  { color: 'black', fontSize: 'clamp(.9rem, 5vw, 1.5rem)' },
]);

export const account = style([
  codeFont,
  atoms({ fontWeight: 'monoFont.bold' }),
]);

export const namespaceStyle = style([
  atoms({ fontWeight: 'monoFont.regular' }),
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
