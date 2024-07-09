'use client';

import { useNotifications } from '@/context/shared/NotificationsContext';
import { onConnectWith } from '@/utils/connect';
import type { ChainId } from '@kadena/client';
import { Account } from '@kadena/spirekey-types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

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
