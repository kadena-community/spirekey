import type { Metadata } from 'next';
import Providers from './providers';

<<<<<<< HEAD
=======
// import '@fontsource/space-grotesk';
>>>>>>> 04ff056 (feat(transactions): list transactions on transactions page)
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
