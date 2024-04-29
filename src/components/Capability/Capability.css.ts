import { style } from '@vanilla-extract/css';

export const capabilityImage = style({
  width: '3rem',
  height: 'auto',
});

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'lg',
});

export const capabilityValue = style({ wordBreak: 'break-all' });
