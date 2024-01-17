import { atoms } from '@kadena/react-ui/theme';
import { style } from '@vanilla-extract/css';

export const carousel = style({});

export const carouselItems = style({
  display: 'flex',
  scrollSnapType: 'x mandatory',
  WebkitOverflowScrolling: 'touch',
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  columnGap: '1em',
  '::-webkit-scrollbar': { display: 'none' },
});

export const carouselItem = style({
  scrollSnapAlign: 'center',
  flexShrink: 0,
  width: '80%',

  selectors: {
    '&:first-child': {
      marginLeft: '10%',
    },

    '&:last-child': {
      marginRight: '10%',
    },
  },
});

export const carouselNav = style([
  atoms({ paddingBlock: 'md' }),
  {
    display: 'flex',
    gap: '0.5em',
    justifyContent: 'center',
    listStyle: 'none',
    width: '80%',
    margin: '0 auto',
    paddingInline: 0,
  },
]);

export const carouselNavItem = style({
  borderRadius: '50%',
  width: '0.7em',
  height: '0.7em',
  border: '1px solid #fff',
});
