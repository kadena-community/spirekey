import { atoms } from '@kadena/react-ui/theme';
import { style, styleVariants } from '@vanilla-extract/css';

export const wrapper = style({
  position: 'relative',
  overflow: 'hidden',
});

export const container = style({
  display: 'flex',
});

export const stepWrapper = style([
  atoms({ paddingInline: 'md' }),
  {
    flexShrink: 0,
    width: '100%',
  },
]);

export const step = style([
  atoms({
    position: 'relative',
    borderRadius: 'sm',
    padding: 'lg',
  }),
  {
    height: '100%',
    background: 'rgba(147, 147, 147, 0.1)',
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

export const buttons = style({
  display: 'flex',
  justifyContent: 'space-between',
});
