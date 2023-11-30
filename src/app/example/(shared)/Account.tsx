import { useBalances } from "@/hooks/useBalance";
import { getReturnUrl } from "@/utils/url";
import { Button, Text } from "@kadena/react-ui";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export type Account = {
  name: string;
  waccount: string;
  caccount: string;
  publicKey: string;
  cid: string;
};

export const Account = ({
  account,
  returnPath,
}: {
  account: Account | null;
  returnPath: string;
}) => {
  const router = useRouter();

  const onLogin = useCallback(() => {
    router.push(
      `${process.env.WALLET_URL}/login?returnUrl=${getReturnUrl(returnPath)}`
    );
  }, []);
  if (!account)
    return (
      <Button icon="Account" onClick={onLogin}>
        Login
      </Button>
    );
  return (
    <>
      <Text bold>Account: {account.name}</Text>
    </>
  );
};
