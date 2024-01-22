import { style } from '@vanilla-extract/css';

export const accountPosition = style({
  width: '100%',
  margin: '0 auto',
  selectors: {
    '&[data-collapsed="true"]': {
      maxHeight: '3rem',
    },
    '&[data-active="true"]': {
      maxHeight: '99999rem',
      display: 'flex',
      flexDirection: 'column',
    },
  },
});
