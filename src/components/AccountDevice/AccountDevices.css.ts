import { atoms } from '@kadena/react-ui/theme';
import { style } from '@vanilla-extract/css';

export const container = style([
  atoms({
    border: 'hairline',
    borderRadius: 'md',
    paddingInline: 'xl',
    paddingBlock: 'lg',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // width: '100%',
  }),
  {
    // width: '100vw',
    background: 'linear-gradient(145deg, #122F4A, #0B1D2E)',
    aspectRatio: '8560 / 5398',
  },
]);
