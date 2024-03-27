'use client';

import { Heading } from '@kadena/react-ui';
import { atoms } from '@kadena/react-ui/styles';
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
