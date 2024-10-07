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

import { Footer } from '@/components/Footer/Footer';
import { Stack } from '@kadena/kode-ui';
import './global.css';
import { layoutWrapperClass } from './styles.css';

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
        <Providers>
          <Stack
            alignItems="center"
            flexDirection="column"
            className={layoutWrapperClass}
          >
            <Stack flexDirection="column" flex={1} width="100%">
              {children}
            </Stack>
            <Footer />
          </Stack>
        </Providers>
      </body>
    </html>
  );
}
