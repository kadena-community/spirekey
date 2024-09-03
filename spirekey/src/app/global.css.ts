import '@kadena/kode-ui/global';
import { tokens, vars } from '@kadena/kode-ui/styles';
import { globalStyle } from '@vanilla-extract/css';

const developerBackgroundColor = vars.colors.$gray70;
const developerBorderColor = vars.colors.$pink50;

globalStyle('body', {
  backgroundColor: tokens.kda.foundation.color.background.base.default,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  borderTop: `3px solid transparent`,
  borderBottom: `3px solid transparent`,
  border: '0',
});

globalStyle('body.developer', {
  backgroundColor: developerBackgroundColor,
  borderTop: `3px solid ${developerBorderColor}`,
  borderBottom: `3px solid ${developerBorderColor}`,
});


globalStyle('body > div:first-of-type', {
  paddingBottom: '4rem!important',
});
