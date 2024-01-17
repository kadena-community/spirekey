import { atoms } from '@kadena/react-ui/theme';
import { style } from '@vanilla-extract/css';
import { before } from 'node:test';

export const container = style([
  atoms({
    border: 'hairline',
    borderRadius: 'md',
    paddingInline: 'xl',
    paddingBlock: 'lg',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }),
  {
    background: 'linear-gradient(145deg, #122F4A, #0B1D2E)',
    aspectRatio: '8560 / 5398',
    position: 'relative',

    selectors: {
      '&:before': {
        content: '""',
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        borderTop: '5px solid',
        borderRadius: 'inherit',
      },
    },
  },
]);
