import { globalStyle, style } from '@vanilla-extract/css';

import { atoms } from '@kadena/kode-ui/styles';

export const wrapper = style([
  atoms({}),
  {
    position: 'relative',
    borderRadius: '1rem',
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    gridTemplateColumns: '64px 1fr 64px 64px',
    gridTemplateRows: '1fr',
    gridTemplateAreas: '"icon title detail minimize"',
    background: "url('/images/card-background.svg') no-repeat center center",
    backdropFilter: 'blur(16px)',
    backgroundSize: 'cover',

    selectors: {
      '&:before': {
        content: '',
        position: 'absolute',
        width: '100%',
        height: '50%',
        inset: 0,
        borderRadius: '1rem',
        padding: '1rem',
        border: '0.25rem solid transparent',
        background:
          'linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)) border-box',
        mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
        maskComposite: 'xor, exclude',
        zIndex: '-1',
      },
      '&:after': {
        content: '',
        position: 'absolute',
        width: '100%',
        height: '50%',
        inset: 0,
        borderRadius: '1rem',
        padding: '1rem',
        border: '0.25rem solid transparent',
        background:
          'linear-gradient(0deg, var(--card-progress-color-start), var(--card-progress-color-start), var(--card-progress-color-end)) border-box',
        mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
        maskComposite: 'xor, exclude',
        zIndex: '-1',
        clipPath:
          'polygon(0 0, var(--card-progress) 0%, var(--card-progress) 100%, 0 100%)',
      },
    },
  },
]);

export const spireKeyLoader = style({
  marginInline: '1rem',
});

export const title = style({
  marginInline: '1.5rem'
})

globalStyle(`${wrapper} div`, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
