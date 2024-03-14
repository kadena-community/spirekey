import { Button } from '@/components/shared/Button/Button';
import { useReturnUrl } from '@/hooks/shared/useReturnUrl';
import { Text } from '@kadena/react-ui';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface Credential {
  type: 'WebAuthn' | 'ED25519';
  publicKey: string;
  id?: string;
}

export interface ConnectAccount {
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
  user?: ConnectAccount | null;
  returnPath: string;
  className?: string;
  onLogout?: () => void;
}) => {
  const router = useRouter();
  const { getReturnUrl } = useReturnUrl();

  const onConnect = useCallback(() => {
    router.push(
      `${process.env.WALLET_URL}/connect?returnUrl=${getReturnUrl(
        returnPath,
      )}&networkId=${process.env.DAPP_NETWORK_ID}`,
    );
  }, [getReturnUrl, returnPath]);

  if (!user)
    return (
      <Button
        variant="primary"
        className={className}
        onPress={onConnect}
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
