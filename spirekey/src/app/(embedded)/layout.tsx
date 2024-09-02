import type { Metadata } from 'next';

import dynamic from 'next/dynamic';
import './global.embedded.css';
import favicon from '@/assets/images/favicon.svg';
import faviconSVG from "@/assets/images/favicon.svg";

export const metadata: Metadata = {
  title: 'Kadena SpireKey',
  description: 'Elevate your blockchain journey',
};

const ErrorNotification = dynamic(
  () => import('@/components/ErrorNotification/ErrorNotification'),
  {
    ssr: false,
  },
);

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
        <ErrorNotification>{children}</ErrorNotification>
      </body>
    </html>
  );
}
