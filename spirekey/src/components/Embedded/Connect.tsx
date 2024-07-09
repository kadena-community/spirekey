'use client';

import ConnectComponent from '@/components/Connect/Connect';
import { publishEvent } from '@/utils/publishEvent';
import { ChainId } from '@kadena/client';
import type { Account } from '@kadena/spirekey-types';

type ConnectProps = {
  chainId: ChainId;
  networkId: string;
};
export default function Connect({ chainId, networkId }: ConnectProps) {
  const connect = (account: Account) => {
    publishEvent('connected', account);
  };
  const cancel = () => {
    publishEvent('canceled:connect');
  };

  return (
    <ConnectComponent
      chainId={chainId}
      networkId={networkId}
      onConnect={connect}
      onCancel={cancel}
    />
  );
}
