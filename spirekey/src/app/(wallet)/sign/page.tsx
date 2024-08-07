'use client';

import { useNotifications } from '@/context/shared/NotificationsContext';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Sign = dynamic(() => import('@/components/Sign/Sign'), { ssr: false });
interface SignProps {
  searchParams: {
    transaction: string;
    returnUrl: string;
    optimistic?: boolean;
    meta?: string;
    translations?: string;
  };
}

export default function SignPage(req: SignProps) {
  const {
    transaction,
    returnUrl,
    optimistic = true,
    meta,
    translations,
  } = req.searchParams;
  const [tx, setTx] = useState(transaction);
  const [rUrl, setRUrl] = useState(returnUrl);
  const [trans, setTrans] = useState(translations);
  const [op, setOp] = useState(optimistic);
  const [useHash, setUseHash] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.location.hash) return;
    const params = new URLSearchParams(window.location.hash.replace(/^#/, '?'));
    const t = params.get('transaction');
    const r = params.get('returnUrl');
    if (!t) return;
    if (!r) return;

    setTx(t);
    setRUrl(r);
    setTrans(params.get('translations') || undefined);
    setOp(params.get('optimistic') !== 'false');
    setUseHash(true);
  }, []);

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
  return (
    <Sign
      {...{
        transaction: tx,
        returnUrl: rUrl,
        optimistic: op,
        meta,
        translations: trans,
        useHash,
      }}
    />
  );
}
