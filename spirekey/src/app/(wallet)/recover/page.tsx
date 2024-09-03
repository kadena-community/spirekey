'use client';

import dynamic from 'next/dynamic';

const Recover = dynamic(() => import('@/components/Recover/Recover'), {
  ssr: false,
});

export default function RecoverPage() {
  const params = new URLSearchParams(location.search);
  return <Recover networkId={params.get('networkId') ?? ''} />;
}
