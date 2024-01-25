import { atoms } from '@kadena/react-ui/styles';
import { style } from '@vanilla-extract/css';

export const details = style([
  atoms({
    marginBlockStart: 'md',
    overflowY: 'hidden',
  }),
  {
    height: 'calc(100vh - 35.75rem)',
  },
]);

export const transactions = style([
  atoms({
    border: 'hairline',
    overflowY: 'auto',
    borderRadius: 'md',
    padding: 'md',
  }),
  {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    flex: '1 1 auto',
    minHeight: 'calc(100vh - 39rem)',
  },
]);

export const transactionAddress = style([
  atoms({
    fontWeight: 'bodyFont.bold',
  }),
]);

export const transactionAmount = style([
  atoms({
    fontWeight: 'bodyFont.bold',
    fontFamily: 'codeFont',
  }),
  {
    selectors: {
      '&[data-transaction-type="credit"]': {
        color: 'green',
      },
      '&[data-transaction-type="debet"]': {
        color: 'red',
      },
    },
  },
]);
