'use client';

import { Container } from '@/components/Layout/Container';
import { PageTitle } from '@/components/Layout/PageTitle';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

const AccountSettings = dynamic(
  () =>
    import('@/components/AccountSettings/AccountSettings').then(
      (mod) => mod.AccountSettings,
    ),
  {
    ssr: false,
  },
);

export default function AccountSettingsPage() {
  const params = useParams();
  const accountName = decodeURIComponent(String(params.caccount));

  return (
    <Container>
      <PageTitle>Account settings</PageTitle>
      <AccountSettings accountName={accountName} />
    </Container>
  );
}
