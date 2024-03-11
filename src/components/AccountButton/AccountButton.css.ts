import { customTokens } from '@/styles/shared/tokens.css';
import { atoms, tokens } from '@kadena/react-ui/styles';
import { keyframes, style } from '@vanilla-extract/css';

export const button = style([
  atoms({
    position: 'relative',
    borderRadius: 'sm',
    textDecoration: 'none',
    textAlign: 'center',
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

export const buttonContent = style([
  atoms({
    borderRadius: 'sm',
  }),
  {
    background: 'rgba(255, 255, 255, 0.2)',
  },
]);

export const iconContainer = style([
  atoms({
    paddingBlock: 'sm',
  }),
  {
    borderTopLeftRadius: tokens.kda.foundation.radius.sm,
    borderTopRightRadius: tokens.kda.foundation.radius.sm,
    background: 'rgba(255, 255, 255, 0.3)',
    color: customTokens.color.white,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'grid',
    overflow: 'hidden',
    position: 'relative',
  },
]);

export const icon = style({
  gridColumn: 1,
  gridRow: 1,
});

export const title = style([
  atoms({
    marginInline: 'sm',
  }),
  {
    color: customTokens.color.white,
    fontWeight: 'bold',
    fontSize: 'clamp(.6rem, 2vw, 1.5rem)',
    lineHeight: '1.5',
  },
]);

export const description = style([
  atoms({
    marginInline: 'sm',
  }),
  {
    color: customTokens.color.white,
    opacity: 0.6,
    fontSize: 'clamp(.6rem, 2vw, 1.5rem)',
    lineHeight: '1.5',
  },
]);

const rotate = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const loader = style({
  animation: rotate,
  animationDuration: '1s',
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite',
});

export const error = style({
  color: '#ff0000',
});

export const success = style({
  color: 'green',
});
