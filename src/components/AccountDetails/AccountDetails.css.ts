import { customTokens } from '@/styles/shared/tokens.css';
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

export const transactionAddress = style({
  color: customTokens.color.white,
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
});

export const transactionAmount = atoms({
  fontWeight: 'primaryFont.bold',
  fontFamily: 'monospaceFont',
});

export const transactionDate = style([
  atoms({
    fontFamily: 'monospaceFont',
    fontSize: 'xs',
  }),
  { alignItems: 'center', display: 'flex' },
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
