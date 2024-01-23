import { atoms } from '@kadena/react-ui/theme';
import { style } from '@vanilla-extract/css';

export const wrapper = style([
  atoms({
    position: 'relative',
    borderRadius: 'sm',
    paddingBlock: 'md',
    paddingInline: 'lg',
  }),
  {
    height: '100%',
    color: 'rgba(255, 255, 255, 0.60)',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(16px)',
    border: 'none',
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
          'linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.1)) border-box',
        mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
        maskComposite: 'xor, exclude',
      },
    },
  },
]);
