import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

import Providers from '@/app/providers';
import favicon from '@/assets/images/favicon.png';
import faviconSVG from '@/assets/images/favicon.svg';

const BetaNotification = dynamic(
  () => import('@/components/BetaNotification/BetaNotification'),
  {
    ssr: false,
  },
);

import './global.css';

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
        <link rel="icon" href={faviconSVG.src} type="image/svg+xml" />
      </head>
      <body>
        <BetaNotification />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
