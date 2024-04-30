'use client';

import { Container } from '@/components/Layout/Container';
import { PageTitle } from '@/components/Layout/PageTitle';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

const AccountDetail = dynamic(
  () =>
    import('@/components/AccountDetail/AccountDetail').then(
      (mod) => mod.AccountDetail,
    ),
  {
    ssr: false,
  },
);

export default function AccountDetailPage() {
  const params = useParams();
  const accountName = decodeURIComponent(String(params.caccount));

  return (
    <Container>
      <PageTitle>Account details</PageTitle>
      <AccountDetail accountName={accountName} />
    </Container>
  );
}
