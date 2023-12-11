import { Account, Device } from "@/hooks/useAccounts";
import { Button, Stack } from "@kadena/react-ui";

export const LoginConfirmation = ({
  account,
  device,
  returnUrl,
}: {
  account: Account | null;
  device: Device | null;
  returnUrl: string;
}) => {
  if (!account) return null;
  if (!device) return null;
  return (
    <Stack direction="row" gap="$xl" justifyContent="flex-end" marginY="$md">
      <Button as="a" href={returnUrl} variant="alternative">
        Cancel
      </Button>
      <Button
        as="a"
        href={`${returnUrl}?response=${Buffer.from(
          JSON.stringify({
            name: device.name,
            waccount: account.name,
            caccount: account.account,
            cid: device["credential-id"],
            publicKey: device.guard.keys[0],
          })
        ).toString("base64")}`}
      >
        Login
      </Button>
    </Stack>
  );
};
