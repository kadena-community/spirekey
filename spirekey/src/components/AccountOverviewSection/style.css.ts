import { style } from '@kadena/kode-ui';
import { responsiveStyle } from '@kadena/kode-ui/styles';

export const sectionClass = style([
  {
    wordBreak: 'break-word',
    width: '100%',
  },
  responsiveStyle({
    md: {
      width: '47%',
    },
  }),
]);
