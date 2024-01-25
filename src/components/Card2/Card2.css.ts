import { KodeMono } from '@kadena/fonts';
import { atoms } from '@kadena/react-ui/styles';
import { style } from '@vanilla-extract/css';

export const card = style([
  atoms({
    position: 'relative',
    overflow: 'hidden',
  }),
  {
    maxWidth: '600px',
    color: 'black',
    margin: '0 auto',
    aspectRatio: '8560 / 5398',
    height: 'auto',
    flexShrink: 0,
    selectors: {
      '&:before': {
        content: '',
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        padding: '1px',
        border: '1px solid transparent',
        background:
          'linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.25)) border-box',
        mask: 'linear-gradient(#f00 0 0) padding-box, linear-gradient(#f00 0 0)',
        maskComposite: 'xor, exclude',
      },
    },
  },
]);

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
    zIndex: -1,
  },
]);

export const cardContentContainer = style([
  atoms({
    height: '100%',
  }),
  {
    paddingBlockStart: '1.5rem',
    paddingBlockEnd: '2rem',
    paddingInline: '2.5rem',
  },
]);

export const cardLogo = style([
  atoms({}),
  {
    height: '2rem',
    width: 'auto',
    objectFit: 'contain',
    objectPosition: 'bottom',
  },
]);

export const accountAlias = style([
  atoms({
    whiteSpace: 'nowrap',
  }),
  {
    color: 'black',
    textOverflow: 'ellipsis',
  },
]);

export const accountAliasContainer = style([
  atoms({
    flexGrow: 0,
  }),
]);

export const account = style([
  atoms({}),
  {
    color: 'black',
  },
]);

export const accountIcon = style([
  atoms({
    marginInline: 'md',
  }),
  {
    color: 'black',
  },
]);

export const accountIconInner = style([
  atoms({
    height: '100%',
    display: 'block',
  }),
  {
    color: 'black',
  },
]);

export const devicesContainer = style([
  atoms({
    flexGrow: 1,
  }),
]);

export const device = style([
  atoms({
    marginInlineStart: 'md',
  }),
]);

export const cardContentCenter = style([
  atoms({
    marginBlockStart: 'lg',
  }),
]);

export const network = style([
  atoms({
    fontWeight: 'bodyFont.regular',
    fontSize: 'lg', // is not applied for some reason
  }),
  {
    fontSize: 'large', // while this is applied
  },
]);

export const cardContentBottom = style([
  atoms({}),
  {
    color: 'black',
  },
]);

export const balanceLabel = style([
  atoms({
    fontSize: 'md',
  }),
]);

export const balance = style([
  atoms({
    fontFamily: 'codeFont',
    fontWeight: 'monoFont.bold',
    fontSize: 'lg',
    marginInlineStart: 'md',
  }),
  {
    marginBlockEnd: '-1.25px',
  },
]);

export const transactionsLabel = style([
  atoms({
    fontSize: 'md',
  }),
]);

export const transactions = style([
  atoms({
    fontFamily: 'codeFont',
    fontWeight: 'monoFont.bold',
    fontSize: 'lg',
    marginInlineStart: 'md',
  }),
  {
    marginBlockEnd: '-1.25px',
  },
]);
