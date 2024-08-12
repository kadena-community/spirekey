'use client';

import dynamic from 'next/dynamic';

const Recover = dynamic(() => import('@/components/Recover/Recover'), {
  ssr: false,
});

export default function RecoverPage() {
  return <Recover />;
}
