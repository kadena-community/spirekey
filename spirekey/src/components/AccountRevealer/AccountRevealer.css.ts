import { atoms, token } from '@kadena/kode-ui/styles';
import { keyframes, style } from '@vanilla-extract/css';
import { charArray } from './characters';

export const codeFont = style([
  atoms({
    fontFamily: 'monospaceFont',
    fontSize: 'md',
  }),
]);

export const wrapper = style([
  codeFont,
  {
    color: token('color.text.base.default'),
    display: 'flex',
    justifyContent: 'center',
  },
]);

export const character = style([codeFont, { display: 'inline-block' }]);

export const scrambler = style({
  opacity: 0.3,
  height: '1.8rem',
});

const moveIt = keyframes(
  charArray
    .map((_char, i) => ({
      [`${(i * 100) / charArray.length}%`]: {
        transform: `translateY(-${(i * 100) / charArray.length}%)`,
      },
    }))
    .reduce((acc, val) => Object.assign(acc, val), {}),
);

export const randomCharsWrapper = style({
  height: '100%',
  overflow: 'hidden',
  display: 'inline-block',
});

export const randomChars = style([
  codeFont,
  {
    display: 'flex',
    flexDirection: 'column',
    animationDuration: '10s',
    animationName: moveIt,
    animationIterationCount: 'infinite',
    animationTimingFunction: 'steps(1)',
  },
]);
