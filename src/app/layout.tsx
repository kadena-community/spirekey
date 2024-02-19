import type { Metadata } from 'next';
import Providers from './providers';

import { Background } from '@/components/Background/Background';
import './global.css';

export const metadata: Metadata = {
  title: 'WebAuthn Wallet',
  description: 'Conveniently secure your internet',
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
          {false && <Background />}
          {children}
        </Providers>
      </body>
    </html>
  );
}
