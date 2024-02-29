import { atoms } from '@kadena/react-ui/styles';
import { style } from '@vanilla-extract/css';

export const card = style({
  position: 'relative',
  overflow: 'hidden',
  maxWidth: '600px',
  color: 'black',
  margin: '0 auto',
  aspectRatio: '8560 / 5398',
  height: 'auto',
  flexShrink: 0,
  background: "url('/images/card-background.svg') no-repeat center center",
  backdropFilter: 'blur(16px)',
  borderRadius: '1rem',
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
});

export const cardBackground = style([
  atoms({
    position: 'absolute',
    width: '100%',
    height: '100%',
  }),
  {
    borderRadius: '1rem',
    objectFit: 'cover',
    objectPosition: 'center',
  },
]);

export const cardContentContainer = style([
  atoms({
    height: '100%',
  }),
  {
    paddingBlockStart: 'clamp(.75rem, 5%, 1.5rem)',
    paddingBlockEnd: 'clamp(1rem, 5%, 2rem)',
    paddingInline: 'clamp(1rem, 5%, 2.5rem)',
  },
]);

export const cardLogo = style([
  {
    width: 'auto',
    objectFit: 'contain',
    objectPosition: 'bottom',
  },
  {
    height: 'clamp(1rem, 5vw, 2rem)',
  },
]);

export const accountAlias = style([
  atoms({
    whiteSpace: 'nowrap',
  }),
  {
    color: 'black',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontSize: 'clamp(.9rem, 5vw, 1.5rem)',
  },
]);

export const accountAliasContainer = style({
  flexGrow: 1,
  minWidth: 0,
});

export const accountIcon = style({
  color: 'black',
  marginInline: 'clamp(0.1rem, 2vw, 1rem)',
});

export const accountIconInner = style({
  height: '100%',
  display: 'block',
  color: 'black',
});

export const devicesContainer = style({
  flexGrow: 1,
});

export const device = style({
  marginInlineStart: 'clamp(0.1rem, 2vw, 1rem)',
  width: '1.5rem',
});

export const cardContentBottom = style({
  color: 'black',
});

export const txAndBalance = style({
  gap: 'clamp(0.3rem, 2vw, 0.9rem)',
});

export const balanceLabel = style({
  fontSize: 'clamp(.75rem, 4vw, 1.125rem)',
  lineHeight: 1,
});

export const balance = style([
  atoms({
    fontFamily: 'codeFont',
    fontWeight: 'monoFont.bold',
  }),
  {
    marginInlineStart: 'clamp(0.5rem, 2vw, 1rem)',
    fontSize: 'clamp(.9rem, 4vw, 1.25rem)',
    lineHeight: 1,
  },
]);

export const transactionsLabel = style({
  fontSize: 'clamp(.75rem, 4vw, 1.125rem)',
  lineHeight: 1,
});

export const transactions = style([
  atoms({
    fontFamily: 'codeFont',
    fontWeight: 'monoFont.bold',
  }),
  {
    marginInlineStart: 'clamp(0.5rem, 2vw, 1rem)',
    fontSize: 'clamp(.9rem, 4vw, 1.25rem)',
    lineHeight: 1,
  },
]);

export const plusIconContainer = style({
  width: '100%',
});

export const cardLink = style({
  textDecoration: 'none',
});
