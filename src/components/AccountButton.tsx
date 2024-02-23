import { useReturnUrl } from '@/hooks/useReturnUrl';
import { Text } from '@kadena/react-ui';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { Button } from './Button/Button';

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
  onLogout,
}: {
  user?: LoginAccount | null;
  returnPath: string;
  className?: string;
  onLogout: () => void;
}) => {
  const router = useRouter();
  const { getReturnUrl } = useReturnUrl();

  const onLogin = useCallback(() => {
    router.push(
      `${process.env.WALLET_URL}/login?returnUrl=${getReturnUrl(returnPath)}`,
    );
  }, [getReturnUrl, returnPath]);

  if (!user)
    return (
      <Button
        variant="primary"
        className={className}
        onPress={onLogin}
        style={{
          paddingBlock: '0.25rem',
          paddingInline: '0.5rem',
        }}
      >
        Log in
      </Button>
    );

  return (
    <>
      <Text bold>Welcome, {user.alias}!</Text>
      <Button
        variant="secondary"
        onPress={onLogout}
        style={{
          paddingBlock: '0.25rem',
          paddingInline: '0.5rem',
        }}
      >
        Log out
      </Button>
    </>
  );
};
