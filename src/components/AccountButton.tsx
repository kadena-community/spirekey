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
  alias: string;
  pendingTxIds: string[];
}

export const AccountButton = ({
  user,
  returnPath,
  className,
}: {
  user?: LoginAccount | null;
  returnPath: string;
  className?: string;
}) => {
  const router = useRouter();
  const { getReturnUrl } = useReturnUrl();

  const onLogin = useCallback(() => {
    router.push(
      `${process.env.WALLET_URL}/login?returnUrl=${getReturnUrl(returnPath)}`,
    );
  }, [getReturnUrl, returnPath]);

  if (!user) return <Button className={className} onPress={onLogin}>Login</Button>;

  return (
    <>
      <Text bold>Account: {user.alias}</Text>
    </>
  );
};
