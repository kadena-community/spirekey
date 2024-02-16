import { atoms } from '@kadena/react-ui/styles';
import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const carouselItems = styleVariants({
  default: {
    display: 'flex',
    scrollSnapType: 'x mandatory',
    WebkitOverflowScrolling: 'touch',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    columnGap: '1em',
    '::-webkit-scrollbar': { display: 'none' },
    selectors: {
      // https://stackoverflow.com/questions/75509058/safari-does-not-include-margins-to-the-scroll-width
      '&:before': {
        content: '',
        minHeight: '100%',
        minWidth: '10%',
      },
      '&:after': {
        content: '',
        minHeight: '100%',
        minWidth: '10%',
      },
    },
  },
  nonScrollable: {
    overflowX: 'hidden',
  },
});

export const carouselItem = recipe({
  base: {
    scrollSnapAlign: 'center',
    flexShrink: 0,
    width: '80%',
  },
  variants: {
    variant: {
      hidden: {
        visibility: 'hidden',
        scrollSnapAlign: 'none',
      },
      nonScrollable: {
        scrollSnapAlign: 'none',
      },
    },
  },
});

export const carouselNav = style([
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
]);

export const carouselAddItem = style({
  width: '0.7em',
  height: '0.7em',
});

globalStyle(`${carouselAddItem} svg`, {
  width: '100%',
  height: '100%',
});

export const carouselNavItem = recipe({
  base: {
    borderRadius: '50%',
    width: '0.7em',
    height: '0.7em',
    border: '1px solid #fff',
  },
  variants: {
    variant: {
      active: {
        backgroundColor: '#fff',
      },
    },
  },
});
