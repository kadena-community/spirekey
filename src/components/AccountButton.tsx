import { useReturnUrl } from '@/hooks/useReturnUrl';
import { Button, Text } from '@kadena/react-ui';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface Credential {
  type: 'WebAuthn' | 'ED25519';
  publicKey: string;
  id?: string;
}

export interface LoginAccount {
  credentials: Credential[];
  accountName: string;
  name: string;
  pendingTxIds: string[];
}

export const AccountButton = ({
  account,
  returnPath,
}: {
  account: LoginAccount | null;
  returnPath: string;
}) => {
  const router = useRouter();
  const { getReturnUrl } = useReturnUrl();

  const onLogin = useCallback(() => {
    router.push(
      `${process.env.WALLET_URL}/login?returnUrl=${getReturnUrl(returnPath)}`,
    );
  }, [getReturnUrl, returnPath]);

  if (!account) return <Button onClick={onLogin}>Login</Button>;

  return (
    <>
      <Text bold>Account: {account.name}</Text>
    </>
  );
};
