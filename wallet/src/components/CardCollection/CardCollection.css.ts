import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const wrapper = style({
  height: '100%',
  width: '100%',
  overflow: 'hidden',
});

export const inner = style({
  position: 'relative',
  height: '100%',
  width: '100%',
});

export const card = recipe({
  base: {
    width: '100%',
    bottom: 'auto',
    position: 'relative',
  },
  variants: {
    variant: {
      active: {
        order: '-1',
      },
      collapsed: {
        position: 'absolute',
      },
      expanded: {},
    },
  },
});
