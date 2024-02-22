import { LoginAccount } from '@/components/AccountButton';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useLoggedInAccount = (encodedAccount?: string) => {
  const [account, setAccount] = useState<LoginAccount | undefined>();
  const router = useRouter();

  useEffect(() => {
    const storedAccount = localStorage.getItem('account');
    if (encodedAccount) {
      const account: LoginAccount = JSON.parse(
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
    localStorage.setItem('account', '');
    router.push(window.location.href.split('?')[0]);
  };

  return {
    account,
    logout,
  };
};
