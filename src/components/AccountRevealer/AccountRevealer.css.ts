import { atoms } from '@kadena/react-ui/styles';
import { keyframes, style } from '@vanilla-extract/css';
import { charArray } from './characters';

export const codeFont = style([
  atoms({
    fontFamily: 'codeFont',
  }),
  { fontSize: 'clamp(.9rem, 5vw, 1.5rem)', lineHeight: '2rem' },
]);

export const wrapper = style([
  codeFont,
  {
    color: 'black',
    fontSize: 'clamp(.9rem, 5vw, 1.5rem)',
    display: 'flex',
    justifyContent: 'center',
    height: '2rem',
  },
]);

export const character = style([
  codeFont,
  { display: 'inline-block', height: '2rem' },
]);

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
