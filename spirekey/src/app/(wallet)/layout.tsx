import type { Metadata } from 'next';

import Providers from '@/app/providers';
import favicon from '@/assets/images/favicon.png';

const BetaNotification = dynamic(
  () => import('@/components/BetaNotification/BetaNotification'),
  {
    ssr: false,
  },
);

import dynamic from 'next/dynamic';
import '../global.css';

export const metadata: Metadata = {
  title: 'Kadena SpireKey',
  description: 'Elevate your blockchain journey',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href={favicon.src} sizes="any" />
      </head>
      <body>
        <BetaNotification />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
