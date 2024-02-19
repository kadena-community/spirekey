import { style } from '@vanilla-extract/css';
import pizzaBackground from './pizzabackground.jpg'

import { globalStyle } from '@vanilla-extract/css';

globalStyle('body', {
  backgroundColor: '#000',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundImage: `url(${pizzaBackground.src})`,
});

export const pizzas:string = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '20px',
  maxWidth: '100%',
  listStyle: 'none',
  margin: '0',
  padding: '0',
});

export const pizzasImg:string = style({
  width: '100%',
});

export const pizzasHero:string = style({
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'space-evenly',
  backgroundColor: 'rgba(0,0,0, .8)',
  padding: '15px',
  position: 'relative',
  width: '80vw',
  marginTop: '20px',

  '::before': {
    content: '',
    position: 'absolute',
    left: '80vw',
    bottom: 0,
    width: 0,
    height: 0,
    borderLeft: ' 40px solid rgba(0, 0, 0, 0.8)',
    borderTop: '40px solid transparent',
    borderBottom: '40px solid transparent'
  }
});

export const pizzasHeroImg:string = style({
  width: '100%',
  height: 'auto',
});

export const pizzasDeals:string = style({
  width: '100%',
  height: 'auto',
  padding: '20px',
});

export const pizzaOrder:string = style({
  background: 'rgba(0,0,0,.7)',
  margin: '25px',
  padding: '20px 10px',
});

export const pizzaButton:string = style({
  background: '#00AD50',
  color: '#fff',
});
