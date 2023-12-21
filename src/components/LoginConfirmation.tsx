import { useAccounts } from '@/hooks/useAccounts';
import { Button, Stack } from '@kadena/react-ui';

export const LoginConfirmation = ({ returnUrl }: { returnUrl: string }) => {
  const { activeAccount, activeDevice } = useAccounts();
  if (!activeAccount || !activeDevice) return null;

  return (
    <Stack direction="row" gap="$xl" justifyContent="flex-end" marginY="$md">
      <Button as="a" href={returnUrl} variant="alternative">
        Cancel
      </Button>

      <Button
        as="a"
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
      </Button>
    </Stack>
  );
};
