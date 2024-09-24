import { atoms, style, tokens } from '@kadena/kode-ui/styles';
import { keyframes } from '@vanilla-extract/css';

const rotate = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const loaderClass = style([
  atoms({
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  {},
]);

export const loaderSpinnerClass = style([
  atoms({
    borderRadius: 'round',
    borderStyle: 'solid',
    borderColor: 'brand.primary.default',
  }),
  {
    borderWidth: '2px',
    borderBlockStartWidth: '0',
    width: tokens.kda.foundation.spacing.xxxl,
    height: tokens.kda.foundation.spacing.xxxl,
    animation: `${rotate} 1s infinite linear `,
  },
]);
