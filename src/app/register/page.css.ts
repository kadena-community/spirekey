import { atoms, tokens } from '@kadena/react-ui/styles';
import { globalStyle, style } from '@vanilla-extract/css';

export const wrapper = style({
  position: 'relative',
  overflow: 'hidden',
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
