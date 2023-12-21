import type { Account, Device } from '@/context/AccountContext';
import { useRouter } from 'next/navigation';
import { useReturnUrl } from './useReturnUrl';

const toBase64 = (tx: any) =>
  Buffer.from(JSON.stringify(tx)).toString('base64');
export const useSign = (walletUrl: string) => {
  const { getReturnUrl } = useReturnUrl();
  const router = useRouter();

  return {
    getSignParams: (tx: unknown, device: Device) => ({
      payload: Buffer.from(JSON.stringify(tx)).toString('base64'),
      cid: device['credential-id'],
    }),
    sign: async (
      tx: unknown,
      device: Device,
      returnPath: string,
      signers?: Account[],
    ) => {
      router.push(
        `${walletUrl}/sign?payload=${toBase64(tx)}&cid=${
          device['credential-id']
        }&returnUrl=${getReturnUrl(returnPath)}&signers=${toBase64(signers)}`,
      );
    },
  };
};
