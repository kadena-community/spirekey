import { globalStyle } from '@vanilla-extract/css';

// @todo: make styles of the ContentHeader component in @kadena-ui easy to override
globalStyle('.connect-header > div > div > *', {
  minWidth: 0,
});
