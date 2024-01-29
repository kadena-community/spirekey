import { style } from '@vanilla-extract/css';

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

export const card = style({
  width: '100%',
});

export const active = style({
  order: '-1',
  marginBlockEnd: '300px',
});

export const collapsed = style({
  bottom: '-160px',
  position: 'absolute',
});
