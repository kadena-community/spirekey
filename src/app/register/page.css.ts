import { atoms } from '@kadena/react-ui/styles';
import { globalStyle, style } from '@vanilla-extract/css';

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

export const buttonsContainer = style([
  atoms({ padding: 'lg', gap: 'xl' }),
  {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    width: '100%',
  },
]);

export const progressButton = style([
  atoms({
    borderRadius: 'sm',
    paddingBlock: 'md',
    paddingInline: 'lg',
    fontWeight: 'headingFont.bold',
  }),
  {
    background: 'transparent',
    color: '#0D1821',
    border: 'none',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
]);
