import { style } from '@vanilla-extract/css';

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
});

export const pizzasHeroImg:string = style({
  width: '100%',
  height: 'auto',
});
