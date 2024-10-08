import { atoms, token } from '@kadena/kode-ui/styles';
import { globalStyle, style } from '@vanilla-extract/css';

export const card = style({
  position: 'relative',
  overflow: 'hidden',
  color: 'black',
  margin: '0 auto',
  aspectRatio: '8560 / 5398',
  width: '100%',
  height: 'auto',
  flexShrink: 0,
  background: "url('/images/card-background.svg') no-repeat center center",
  backdropFilter: 'blur(16px)',
  borderRadius: '1rem',
  backgroundSize: 'cover',
  boxShadow: '0px 0px 24px 0px #000000CC',

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

export const accountAlias = style([
  atoms({
    whiteSpace: 'nowrap',
    fontWeight: 'primaryFont.bold',
  }),
  {
    color: token('color.text.base.default'),
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
]);

export const accountAliasContainer = style({
  flexGrow: 1,
  minWidth: 0,
});

export const accountIcon = style({
  color: token('color.text.base.default'),
  marginInline: 'clamp(0.1rem, 2vw, 1rem)',
});

export const accountIconInner = style({
  height: '100%',
  display: 'block',
  color: token('color.text.base.default'),
});

// Should update the getDeviceIcon component to return the component directly
export const device = style({});
globalStyle(`${device} > svg, ${device} > img`, {
  width: token('icon.size.lg'),
});

export const cardContentBottom = style({
  color: token('color.text.base.default'),
});

export const txAndBalance = style({
  gap: 'clamp(0.3rem, 2vw, 0.9rem)',
  marginBlockStart: '-.4rem',
});

export const balanceLabel = style([
  atoms({ fontSize: 'sm' }),
  { opacity: 0.6 },
]);

export const balance = style([
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

globalStyle(`${icon} > div`, {
  position: 'absolute',
  paddingInlineEnd: '32px',
});
