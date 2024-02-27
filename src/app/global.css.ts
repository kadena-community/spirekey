import backgroundImageLandscape from '@/assets/images/bg-landscape.jpg';
import backgroundImagePortrait from '@/assets/images/bg-portrait.png';
import '@kadena/react-ui/global';
import { globalStyle } from '@vanilla-extract/css';

globalStyle('body', {
  backgroundColor: '#081320',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
});
