'use client';

import { PageTitle } from '@/components/Layout/PageTitle';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

const DeviceDetail = dynamic(
  () =>
    import('@/components/Device/DeviceDetail').then((mod) => mod.DeviceDetail),
  {
    ssr: false,
  },
);

export default function DeviceDetailPage() {
  const params = useParams();
  const accountName = decodeURIComponent(String(params.caccount));
  const credentialId = decodeURIComponent(String(params.cid));

  return (
    <>
      <PageTitle>Device details</PageTitle>
      <DeviceDetail accountName={accountName} credentialId={credentialId} />
    </>
  );
}
