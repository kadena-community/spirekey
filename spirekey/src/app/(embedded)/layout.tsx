import type { Metadata } from 'next';

import {
  default as favicon,
  default as faviconSVG,
} from '@/assets/images/favicon.svg';
import './global.embedded.css';

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
      <body>{children}</body>
    </html>
  );
}
