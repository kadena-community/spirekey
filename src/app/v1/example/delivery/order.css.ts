import {keyframes, style} from '@vanilla-extract/css';

export const pizzas:string = style({
  display: 'flex',
  justifyContent: 'space-evenly',
  gap: '20px',
  flexWrap: 'wrap',
  maxWidth: '100%',
  listStyle: 'none',
  margin: '0',
  padding: '0',
});

export const pizzasHero:string = style({
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0, .8)',
  padding: '15px',
  position: 'relative',
  width: '80vw',
  marginTop: '20px',
  height: '80px',
  fontSize: '.8em',

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

export const pizzasDealsList:string = style({
  height: 'auto',
  width: '40%',
});

export const pizzasDeals:string = style({
  width: '100%',
  height: 'auto',
  padding: '20px 0px',
});

export const pizzaOrder:string = style({
  background: 'rgba(0,0,0,.7)',
  margin: '25px',
  padding: '20px 20px',
});

export const pizzaButton:string = style({
  background: '#00AD50',
  color: '#fff',
});


export const pizzaLoaderWrapper:string = style({
  width: 'auto',
  height: 'auto',
  margin: '20px',
  padding: '20px',
  position: 'relative',
  background: 'rgba(0,0,0,.7)',
  textAlign: 'center',
});
export const pizzaLoader:string = style({
  width: '100%',
  height: '40vh',
  position: 'relative',
  top: '100px',
});


const animations: any = {};

for (let i = 6; i > 0; i--) {
  animations['slideIn' + i] = keyframes({
    '0%': {
      transform: `translateX(-50%) rotate(${i * 60}deg) translateY(-30px)`,
      visibility: 'visible'
    },
    '100%': {
      transform: `translateX(-50%) rotate(${i * 60}deg) translateY(-15px)`,
      visibility: 'visible'
    }
  });
}

export const pizzaLoaderSlice:string = style({
  position: 'absolute',
  width: '0',
  height: '0',
  borderLeft: '15px solid transparent',
  borderRight: '15px solid transparent',
  borderTop: '35px solid #FEFCC6',
  top: '0%',
  left: '50%',
  transform: 'translateX(-50%)',
  visibility: 'hidden',
  zIndex: '10',
  animationDuration: '1.2s',
  animationIterationCount: 'infinite',
  animationDirection: 'alternate',
  animationTimingFunction: 'linear',

  '::before': {
    content: '',
    position: 'absolute',
    left: '-15px',
    top: '-45px',
    width: '30px',
    height: '15px',
    background: '#FEFCC6',
    borderRadius: '100%',
    borderTop: '5px solid #E57A19',
    zIndex: '-1',
  },
  selectors: {
    '&:nth-child(1)': {
      animationName: animations['slideIn1'],
      animationDelay: '.2s',
    },

    '&:nth-child(2)': {
      animationName: animations['slideIn2'],
      animationDelay: '.4s',
    },

    '&:nth-child(3)': {
      animationName: animations['slideIn3'],
      animationDelay: '.6s',
    },

    '&:nth-child(4)': {
      animationName: animations['slideIn4'],
      animationDelay: '.8s',
    },

    '&:nth-child(5)': {
      animationName: animations['slideIn5'],
      animationDelay: '1s',
    },

    '&:nth-child(6)': {
      animationName: animations['slideIn6'],
      animationDelay: '1.2s',
    },
  },
});


export const pizzaLoaderSliceTomato:string = style({
  background: '#A30000',
  position: 'absolute',
  borderRadius: '100%',

  selectors:{
    '&:nth-child(1)': {
      width: '10px',
      height: '10px',
      top: '-37px',
      left: '1px',
    },
    '&:nth-child(2)': {
      width: '7px',
      height: '7px',
      top: '-25px',
      left: '-7px',
    }
  }
});

