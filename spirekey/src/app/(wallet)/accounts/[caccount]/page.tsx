import dynamic from 'next/dynamic';

const AccountDetail = dynamic(
  () => import('@/components/AccountDetail/AccountDetail'),
  {
    ssr: false,
  },
);

export default function AccountDetailPage() {
  return <AccountDetail />;
}
