import type { Metadata } from 'next';
import Providers from '../providers';

import '../global.css';
import favicon from '@/assets/images/favicon.svg';
import faviconSVG from "@/assets/images/favicon.svg";

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
        <Providers displayDevMode={false}>{children}</Providers>
      </body>
    </html>
  );
}
