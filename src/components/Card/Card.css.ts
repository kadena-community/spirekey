import { atoms } from '@kadena/react-ui/theme';
import { style } from '@vanilla-extract/css';

export const card = style([
  atoms({
    backgroundColor: 'brand.primary.default',
    border: 'hairline',
    padding: 'md',
    borderRadius: 'md',
    width: '100%',
  }),
]);

export const cardPosition = style({
  maxHeight: '10rem',
  transition: 'max-height 0.3s ease-in-out',
  selectors: {
    '&[data-collapsed="true"]': {
      maxHeight: '3rem',
    },
    '&[data-active="true"]': {
      maxHeight: '100rem',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
  },
});
