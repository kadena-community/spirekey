import { style } from '@kadena/kode-ui';
import { atoms } from '@kadena/kode-ui/styles';

export const badgeClass = style([
  atoms({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 'sm',
    color: 'text.base.inverse.default',
    backgroundColor: 'base.inverse.default',
  }),
  {
    width: '20px',
    aspectRatio: '1/1',
    paddingBlock: '2px',
  },
]);
