import type { Metadata } from 'next';
import Providers from './providers';

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
