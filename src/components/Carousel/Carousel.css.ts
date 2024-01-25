import { atoms } from '@kadena/react-ui/styles';
import { style, styleVariants } from '@vanilla-extract/css';

export const carousel = style({});

export const carouselItems = styleVariants({
  default: {
    display: 'flex',
    scrollSnapType: 'x mandatory',
    WebkitOverflowScrolling: 'touch',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    columnGap: '1em',
    '::-webkit-scrollbar': { display: 'none' },
  },
  nonScrollable: {
    overflowX: 'hidden',
  },
});

export const carouselItem = styleVariants({
  default: {
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
  },
  hidden: {
    display: 'none',
  },
  nonScrollable: {
    scrollSnapAlign: 'none',
  },
});

export const carouselNav = styleVariants({
  default: [
    atoms({
      paddingBlock: 'md',
    }),
    {
      display: 'flex',
      gap: '0.5em',
      justifyContent: 'center',
      listStyle: 'none',
      width: '80%',
      margin: '0 auto',
      paddingInline: 0,
    },
  ],
  hidden: [
    {
      display: 'none',
    },
  ],
});

export const carouselNavItem = style({
  borderRadius: '50%',
  width: '0.7em',
  height: '0.7em',
  border: '1px solid #fff',
});
