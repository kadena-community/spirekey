import { NavBar } from '@/components/NavBar';
import type { Metadata } from 'next';
import Providers from './providers';

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
          <>
            <nav>
              <NavBar />
            </nav>
            {children}
          </>
        </Providers>
      </body>
    </html>
  );
}
