import { customTokens } from '@/styles/tokens.css';
import { atoms } from '@kadena/react-ui/styles';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const details = style([
  atoms({
    marginBlockStart: 'md',
    paddingInline: 'md',
  }),
  {
    width: '100%',
  },
]);

export const transactionAddress = style([
  {
    color: customTokens.color.white,
    fontWeight: 'bold',
  },
]);

export const transactionAmount = style([
  atoms({
    fontWeight: 'bodyFont.bold',
    fontFamily: 'codeFont',
  }),
]);

export const transactionDate = style([
  atoms({
    alignItems: 'center',
    display: 'flex',
    fontFamily: 'codeFont',
    fontSize: 'xs',
  }),
]);

export const transactionAmountVariants = recipe({
  base: {
    textAlign: 'end',
  },
  variants: {
    variant: {
      credit: {
        color: 'green',
      },
      debet: {
        color: 'red',
      },
    },
  },
  defaultVariants: {
    variant: 'credit',
  },
});
