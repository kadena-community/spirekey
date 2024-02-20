import { style } from '@vanilla-extract/css';

export const loadingWrapper = style({
  width: 'auto',
  height: 'auto',
  margin: '20px',
  padding: '20px',
  position: 'relative',
  background: 'rgba(0,0,0,.7)',
  textAlign: 'center',
});

export const list = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '1em',
  maxWidth: '100%',
  listStyle: 'none',
  marginBlockStart: '1em',
  padding: '0',
});

export const hero = style({
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
    borderLeft: '40px solid rgba(0, 0, 0, 0.8)',
    borderTop: '40px solid transparent',
    borderBottom: '40px solid transparent',
  },
});

export const dealImg = style({
  width: '100%',
  height: 'auto',
});

export const deals = style({
  padding: '20px 0px',
});

export const order = style({
  background: 'rgba(0, 0, 0, 0.7)',
  margin: '25px',
  padding: '20px 20px',
});

export const button = style({
  background: '#00AD50',
  color: '#fff',
});
