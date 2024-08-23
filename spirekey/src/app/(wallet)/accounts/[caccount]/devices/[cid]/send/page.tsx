'use client';

import dynamic from 'next/dynamic';

const SendForm = dynamic(() => import('@/components/SendForm/SendForm'), {
  ssr: false,
});

export default function SendPage() {
  return <SendForm />;
}
