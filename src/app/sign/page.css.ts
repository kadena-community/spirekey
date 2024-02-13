import { atoms } from '@kadena/react-ui/styles';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
});

export const container = style({
  display: 'flex',
});

export const step = style([
  atoms({
    paddingInline: 'lg',
  }),
  {
    width: '100%',
    flexShrink: '0',
  },
]);
