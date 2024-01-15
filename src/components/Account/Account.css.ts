import { style } from '@vanilla-extract/css';

export const accountPosition = style({
  // maxHeight: '10rem',
  // transition: 'max-height 0.3s ease-in-out',
  maxWidth: '453px',
  aspectRatio:  '8560 / 5398',
  height: 'auto',
  width: '100%' ,
  margin: '0 auto',
  selectors: {
    '&[data-collapsed="true"]': {
      maxHeight: '3rem',
    },
    '&[data-active="true"]': {
      maxHeight: '99999rem',
      height: 'calc(100vh - 20.5rem)',
      display: 'flex',
      flexDirection: 'column',
    },
  },
});
