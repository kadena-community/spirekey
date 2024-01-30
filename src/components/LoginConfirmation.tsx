import { useAccounts } from '@/hooks/useAccounts';
import { Stack } from '@kadena/react-ui';
import { ButtonLink } from './ButtonLink/ButtonLink';

export const LoginConfirmation = ({ returnUrl }: { returnUrl: string }) => {
  const { activeAccount, activeDevice } = useAccounts();
  if (!activeAccount || !activeDevice) return null;

  return (
    <Stack
      flexDirection="row"
      gap="xl"
      justifyContent="flex-end"
      marginBlock="md"
    >
      <ButtonLink href={returnUrl}>Cancel</ButtonLink>

      <ButtonLink
        href={`${returnUrl}?response=${Buffer.from(
          JSON.stringify({
            name: activeDevice.name,
            waccount: activeAccount.name,
            caccount: activeAccount.account,
            cid: activeDevice['credential-id'],
            publicKey: activeDevice.guard.keys[0],
          }),
        ).toString('base64')}`}
      >
        Login
      </ButtonLink>
    </Stack>
  );
};
