import '@kadena/kode-ui/global';
import { globalStyle } from '@vanilla-extract/css';

globalStyle('html, body', {
  padding: 0,
  margin: 0,
  width: '100%',
  height: '100svh',
  background: 'transparent',
});

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});
