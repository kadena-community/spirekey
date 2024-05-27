import { atoms } from '@kadena/react-ui/styles';
import { style } from '@vanilla-extract/css';

export const wrapper = style([
  atoms({ padding: 'md', gap: 'lg' }),
  {
    position: 'fixed',
    zIndex: 999,
    width: '100%',
    top: 0,
    display: 'flex',
    flexDirection: 'column',
  },
]);
