import { style } from '@kadena/kode-ui';
import { atoms, globalStyle } from '@kadena/kode-ui/styles';

export const cardContainerWrapperClass = style({});

globalStyle(`${cardContainerWrapperClass} > div`, {
  paddingBlock: '0!important',
});

export const iconColorClass = style([
  atoms({
    color: 'icon.brand.primary.default',
  }),
]);
