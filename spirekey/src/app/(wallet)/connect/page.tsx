'use client';

import { useNotifications } from '@/context/shared/NotificationsContext';
import { onConnectWith } from '@/utils/connect';
import type { ChainId } from '@kadena/client';
import { Account } from '@kadena/spirekey-types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ConnectComponent = dynamic(() => import('@/components/Connect/Connect'), {
  ssr: false,
});

type ConnectProps = {
  searchParams: {
    returnUrl: string;
    reason?: string;
    optimistic?: boolean;
    networkId: string;
    chainId: ChainId;
  };
};

export default function Connect({ searchParams }: ConnectProps) {
  const {
    returnUrl,
    reason = '',
    optimistic = true,
    networkId,
    chainId = process.env.CHAIN_ID as ChainId,
  } = searchParams;

  const router = useRouter();

  const { addNotification } = useNotifications();
  useEffect(() => {
    try {
      const url = new URL(returnUrl);
      if (url.host !== new URL(document.referrer).host)
        throw new Error('return url does not match referrer');

      addNotification({
        id: 2,
        title: 'Deprecation warning',
        message:
          'This method of connecting to a dApp has been deprecated. Please use the SpireKey SDK instead.',
        variant: 'warning',
        timeout: 30000,
      });
    } catch (error) {
      addNotification({
        id: 1,
        title: 'Invalid return url received',
        message: 'Please contact the dApp you tried to interact with',
        variant: 'error',
        timeout: 30000,
      });
    }
  }, []);

  const connect = onConnectWith({ addNotification, redirect: router.push });
  const onConnect = (account: Account) => {
    connect({
      account,
      networkId,
      chainId,
      url: new URL(returnUrl),
    })();
  };
  const onCancel = () => router.push(returnUrl);

  return (
    <ConnectComponent
      chainId={chainId}
      networkId={networkId}
      onConnect={onConnect}
      onCancel={onCancel}
    />
  );
}
