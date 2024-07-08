import { atoms, style } from '@kadena/kode-ui/styles';

export const walletNamespace = atoms({
  color: 'text.gray.default',
  textDecoration: 'underline',
});

export const modulePermissionsGroup = atoms({
  borderStyle: 'solid',
  borderWidth: 'normal',
  borderColor: 'base.subtle',
  borderRadius: 'sm',
  flexDirection: 'column',
  paddingBlock: 'sm',
  marginBlock: 'md',
});
export const modulePermissionsHeader = atoms({
  marginInline: 'md',
});

export const permission = style([
  atoms({
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 'md',
    paddingBlock: 'md',
    paddingInline: 'md',
  }),
]);
