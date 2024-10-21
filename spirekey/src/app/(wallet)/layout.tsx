import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

import Providers from '@/app/providers';
import favicon from '@/assets/images/favicon.png';
import faviconSVG from '@/assets/images/favicon.svg';

const IntendNotification = dynamic(
  () => import('@/components/IntendNotification/IntendNotification'),
  {
    ssr: false,
  },
);

import { Stack } from '@kadena/kode-ui';
import './global.css';
import { layoutWrapperClass } from './styles.css';

export const metadata: Metadata = {
  title: 'Chainweaver V3 Alpha',
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
        <IntendNotification />
        <Providers>
          <Stack
            alignItems="center"
            flexDirection="column"
            className={layoutWrapperClass}
          >
            {children}
          </Stack>
        </Providers>
      </body>
    </html>
  );
}
