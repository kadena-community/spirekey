import { atoms, token } from '@kadena/kode-ui/styles';
import { globalStyle, style } from '@vanilla-extract/css';

export const card = style({
  position: 'relative',
  overflow: 'hidden',
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
    position: 'absolute',
    bottom: '1.25em',
    right: '1.25em',
    width: 'auto',
    height: token('icon.size.sm'),
  },
]);

export const accountAlias = style([
  atoms({
    whiteSpace: 'nowrap',
    fontWeight: 'primaryFont.bold',
  }),
  {
    color: token('color.text.base.inverse.default'),
    textOverflow: 'ellipsis',
    overflow: 'hidden',
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

// Should update the getDeviceIcon component to return the component directly
export const device = style({});
globalStyle(`${device} > svg`, {
  width: token('icon.size.sm'),
});

export const cardContentBottom = style({
  color: 'black',
});

export const txAndBalance = style({
  gap: 'clamp(0.3rem, 2vw, 0.9rem)',
});

export const balanceLabel = style([atoms({ fontSize: 'sm' })]);

export const balance = style([
  atoms({
    fontFamily: 'monospaceFont',
    fontWeight: 'monospaceFont.bold',
    fontSize: 'sm',
    marginInlineStart: 'sm',
  }),
]);

export const transactionsLabel = style({
  fontSize: token('typography.fontSize.sm'),
});

export const transactions = style([
  atoms({
    fontFamily: 'monospaceFont',
    fontWeight: 'monospaceFont.bold',
    fontSize: 'sm',
    marginInlineStart: 'sm',
  }),
]);

export const icon = style({
  padding: '32px',
});

export const logo = style({
  fontSize: '64px',
});

globalStyle(`${icon} > div`, {
  position: 'absolute',
  paddingInlineEnd: '32px',
});
