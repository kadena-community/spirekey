import Providers from '../../../providers';

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Providers displayDevMode={false}>{children}</Providers>;
}
