import type { Metadata } from 'next';

import Providers from '@/app/providers';
import favicon from '@/assets/images/favicon.png';
import { BetaNotification } from '@/components/BetaNotification/BetaNotification';

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
