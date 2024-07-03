'use client';

import { Heading } from '@kadena/kode-ui';
import { atoms } from '@kadena/kode-ui/styles';
import dynamic from 'next/dynamic';

const Recover = dynamic(() => import('@/components/Recover/Recover'), {
  ssr: false,
});

export default function RecoverPage() {
  return (
    <div
      className={atoms({
        paddingInline: 'lg',
        paddingBlock: 'lg',
      })}
    >
      <Heading>Recover</Heading>
      <Recover />
    </div>
  );
}
