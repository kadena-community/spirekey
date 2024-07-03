import dynamic from 'next/dynamic';

const AccountDetail = dynamic(
  () => import('@/components/AccountDetail/AccountDetail'),
  {
    ssr: false,
  },
);

interface Props {
  searchParams: {
    caccount: string;
  };
}

export default function AccountDetailPage({ searchParams }: Props) {
  const accountName = decodeURIComponent(String(searchParams.caccount));
  return <AccountDetail accountName={accountName} />;
}
