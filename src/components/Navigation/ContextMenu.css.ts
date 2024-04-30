import { tokens } from '@kadena/react-ui/styles';
import { recipe } from '@vanilla-extract/recipes';

export const wrapper = recipe({
  base: {
    position: 'absolute',
    top: '64px',
    right: 0,
    zIndex: 99998,
    backgroundColor: tokens.kda.foundation.color.neutral.n1,
  },
  variants: {
    variant: {
      default: {
        display: 'none! important',
      },
      open: {
        display: 'flex! important',
      },
    },
  },
});
