import { atoms } from '@kadena/react-ui/styles';
import { style } from '@vanilla-extract/css';

export const wrapper = style([
  atoms({ borderRadius: 'sm' }),
  {
    position: 'relative',
    background: '#fff',
    overflow: 'hidden',
  },
]);

export const progressBar = style({
  backgroundColor: '#58BD9C',
  position: 'absolute',
  left: 0,
  top: 0,
  height: '100%',
  pointerEvents: 'none',
});
