import { style } from '@kadena/kode-ui';
import { token } from '@kadena/kode-ui/styles';
import { globalStyle } from '@vanilla-extract/css';

export const footerClass = style({});

globalStyle(`${footerClass} > *`, {
  opacity: '.4',
  color: token('color.text.gray.default'),
});
