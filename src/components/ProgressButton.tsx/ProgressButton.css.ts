import { style } from '@vanilla-extract/css';

export const wrapper = style({
  position: 'relative',
});

export const progressBar = style({
  backgroundColor: '#58BD9C',
  position: 'absolute',
  left: 0,
  top: 0,
  height: '100%',
  pointerEvents: 'none',
});

export const content = style({
  position: 'relative',
  zIndex: 1,
});
