import { atoms } from '@kadena/react-ui/styles';
import { style } from '@vanilla-extract/css';

export const titleContainer = style([
  atoms({
    display: 'flex',
    fontSize: 'sm',
    fontWeight: 'monoFont.medium',
    flexDirection: 'column',
    justifyContent: 'center',
  }),
  {
    color: 'black',
  },
]);

export const valueIconContainer = style([
  atoms({}),
]);

export const valueContainer = style([
  atoms({
    display: 'inline-block',
    fontFamily: 'codeFont',
    fontWeight: 'monoFont.semiBold',
    width: '100%',
  }),
  {
    wordBreak: 'break-word',
    flex: '1',
    color: 'black',
  },
]);
