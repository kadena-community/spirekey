import { tokens } from '@kadena/react-ui/styles';
import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const wrapper = recipe({
  base: {
    transform: 'translateX(-200%)',
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    zIndex: 99999,
  },
  variants: {
    variant: {
      default: {},
      open: {
        display: 'flex! important',
        transform: 'translateX(0)',
      },
    },
  },
});

export const background = recipe({
  base: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: tokens.kda.foundation.color.neutral.n1,
    zIndex: 99999,
    opacity: 0,
    transition: 'opacity 0.5s',
  },
  variants: {
    variant: {
      default: {},
      open: {
        opacity: 0.95,
      },
    },
  },
});

export const nav = style({
  height: '100%',
  alignItems: 'center',
});

export const icon = style({
  display: 'none',
});

export const linkList = style({
  flexDirection: 'column',
  marginBottom: '64px',
});

globalStyle(`${linkList} li`, {
  display: 'flex',
  margin: '0 auto',
});
