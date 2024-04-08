'use client';

import dynamic from 'next/dynamic';

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
    optimistic = false,
    meta,
    translations,
  } = req.searchParams;

  return (
    <Sign {...{ transaction, returnUrl, optimistic, meta, translations }} />
  );
}
