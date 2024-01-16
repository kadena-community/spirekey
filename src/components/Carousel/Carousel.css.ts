import { atoms } from '@kadena/react-ui/theme';
import { style } from '@vanilla-extract/css';

export const carousel = style({
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  display: 'flex',
  scrollSnapType: 'x mandatory',
  WebkitOverflowScrolling: 'touch',
  position: 'relative',
  width: '100%',
});

export const carouselItem = style({
  scrollSnapAlign: 'center',
  maxWidth: '80vw',
});
