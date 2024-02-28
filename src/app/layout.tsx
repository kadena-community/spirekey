import type { Metadata } from 'next';
import Providers from './providers';

import { Background } from '@/components/Background/Background';
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
      <body>
        <Providers>
          {true && <Background />}
          {children}
        </Providers>
      </body>
    </html>
  );
}
