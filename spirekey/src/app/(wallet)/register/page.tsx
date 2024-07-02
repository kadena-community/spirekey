import dynamic from 'next/dynamic';

const Registration = dynamic(
  () => import('@/components/Registration/Registration'),
  {
    ssr: false,
  },
);

export default function Register() {
  return <Registration />;
}
