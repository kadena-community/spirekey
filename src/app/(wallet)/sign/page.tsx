'use client';

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
