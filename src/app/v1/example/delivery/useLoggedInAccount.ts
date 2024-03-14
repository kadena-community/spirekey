import { ConnectAccount } from '@/app/v1/example/delivery/components/AccountButton';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useLoggedInAccount = (encodedAccountString?: string) => {
  const urlParams = new URLSearchParams(window?.location?.search);
  const encodedAccount = urlParams.get('user') || encodedAccountString;
  const [account, setAccount] = useState<ConnectAccount | undefined>();
  const router = useRouter();

  useEffect(() => {
    const storedAccount = localStorage.getItem('account');
    if (encodedAccount) {
      const account: ConnectAccount = JSON.parse(
        Buffer.from(encodedAccount, 'base64').toString(),
      );
      localStorage.setItem('account', JSON.stringify(account));
      setAccount(account);
      return;
    }
    if (!storedAccount) return;
    return setAccount(JSON.parse(storedAccount));
  }, [encodedAccount]);

  const logout = () => {
    setAccount(undefined);
    localStorage.removeItem('account');
    localStorage.removeItem('messages');
    localStorage.removeItem('deliveryIds');
    localStorage.removeItem('newOrderId');
    localStorage.removeItem('connectionId');
    router.push(window.location.href.split('?')[0]);
  };

  return {
    account,
    logout,
  };
};
