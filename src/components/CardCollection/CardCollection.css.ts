import { style } from '@vanilla-extract/css';

export const wrapper = style({
  height: '100%',
  width: '100%',
});

export const inner = style({
  position: 'relative',
  height: '100%',
  width: '100%',
});

export const card = style({
  width: '100%',
  bottom: 'auto',
  position: 'relative',
  marginBlockEnd: '20px',
});

export const active = style({
  order: '-1',
});

export const collapsed = style({
  position: 'absolute',
});

export const expanded = style({
  position: 'relative',
});
