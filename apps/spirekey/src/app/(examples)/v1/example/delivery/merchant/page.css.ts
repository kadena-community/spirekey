import pizzaBackground from '@/app/(examples)/v1/example/delivery/pizzabackground.jpg';
import { globalStyle } from '@vanilla-extract/css';

globalStyle('body', {
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundImage: `url(${pizzaBackground.src})`,
  backgroundColor: 'rgba(40, 0, 0, 0.8)',
  backgroundBlendMode: 'saturation',
});
