import { atoms } from '@kadena/react-ui/theme';
import { style } from '@vanilla-extract/css';

export const details = style([
  atoms({
    backgroundColor: 'brand.secondary.default',
    flex: 1,
    borderRadius: 'md',
    marginBlockStart: 'sm',
    border: 'hairline',
  }),
]);
