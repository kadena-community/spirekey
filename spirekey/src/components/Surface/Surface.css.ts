import { atoms } from '@kadena/kode-ui/styles';
import { style } from '@vanilla-extract/css';

export const background = style([
  atoms({
    position: 'relative',
    borderRadius: 'sm',
    padding: 'lg',
  }),
  {
    background: 'rgba(147, 147, 147, 0.1)',
    backdropFilter: 'blur(18px)',
    selectors: {
      '&:before': {
        pointerEvents: 'none',
        content: '',
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        padding: '1px',
        border: '1px solid transparent',
        background:
          'linear-gradient(-45deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.25)) border-box',
        mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
        maskComposite: 'xor, exclude',
      },
    },
  },
]);
