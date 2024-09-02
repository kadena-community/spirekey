import { style } from '@vanilla-extract/css';

export const list = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '1rem',
  maxWidth: '100%',
  listStyle: 'none',
  marginBlockStart: '1rem',
  padding: '0',
});

export const hero = style({
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0, .8)',
  padding: '1rem 1rem 1rem 2rem',
  position: 'relative',
  width: '80vw',
  marginTop: '2rem',
  height: '6rem',
  fontSize: '.8em',

  '::before': {
    content: '',
    position: 'absolute',
    left: '80vw',
    bottom: 0,
    width: 0,
    height: 0,
    borderLeft: '3rem solid rgba(0, 0, 0, 0.8)',
    borderTop: '3rem solid transparent',
    borderBottom: '3rem solid transparent',
  },
});

export const logo = style({
  height: '100%',
});

export const deals = style({
  padding: '20px 0px',
});

export const order = style({
  background: 'rgba(0, 0, 0, 0.7)',
  margin: '2em',
  padding: '2em',
});

export const button = style({
  background: '#00AD50',
  color: '#fff',
});

export const account = style({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0, .8)',
  padding: '1rem 2rem 1rem 1rem',
  position: 'relative',
  marginTop: '1rem',
  height: '3rem',
  fontSize: '.8em',

  '::before': {
    content: '',
    position: 'absolute',
    left: '-1.5rem',
    bottom: 0,
    width: 0,
    height: 0,
    borderRight: '1.5rem solid rgba(0, 0, 0, 0.8)',
    borderTop: '1.5rem solid transparent',
    borderBottom: '1.5rem solid transparent',
  },
});

export const title = style({
  fontWeight: 'bold',
  marginBlockStart: '-0.25rem',
  display: 'block',
});
