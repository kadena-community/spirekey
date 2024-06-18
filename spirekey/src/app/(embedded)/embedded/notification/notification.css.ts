import { style } from '@vanilla-extract/css';

import { atoms } from '@kadena/react-ui/styles';

export const wrapper = style([
  atoms({
    borderRadius: 'md',
  }),
  {
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    gridTemplateColumns: '64px 1fr 64px 64px',
    gridTemplateRows: '1fr',
    gridTemplateAreas: '"icon title detail minimize"',
    background: 'rgba(255, 255, 255, 0.5)',
  },
]);
