import { keyframes, style } from '@vanilla-extract/css';

export const wrapper = style({
  width: '100%',
  height: '40vh',
  position: 'relative',
  top: '100px',
});

type AnimationsType = Record<string, string>;
const animations: AnimationsType = {};

for (let i = 6; i > 0; i--) {
  animations['slideIn' + i] = keyframes({
    '0%': {
      transform: `translateX(-50%) rotate(${i * 60}deg) translateY(-30px)`,
      visibility: 'visible',
    },
    '100%': {
      transform: `translateX(-50%) rotate(${i * 60}deg) translateY(-15px)`,
      visibility: 'visible',
    },
  });
}

export const slice = style({
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

export const sliceTomato = style({
  background: '#A30000',
  position: 'absolute',
  borderRadius: '100%',

  selectors: {
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
    },
  },
});
