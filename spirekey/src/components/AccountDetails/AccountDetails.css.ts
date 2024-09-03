import { atoms, token } from '@kadena/kode-ui/styles';
import { style } from '@vanilla-extract/css';

export const amountCell = style([
  atoms({ textAlign: 'right' }),
  {
    selectors: {
      '&[data-type="debit"]': {
        color: token('color.accent.semantic.negative'),
      },
      '&[data-type="credit"]': {
        color: token('color.accent.semantic.positive'),
      },
    },
  },
]);
