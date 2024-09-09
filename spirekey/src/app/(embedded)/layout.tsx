import type { Metadata } from 'next';

import {
  default as favicon,
  default as faviconSVG,
} from '@/assets/images/favicon.svg';
import { darkThemeClass } from '@kadena/kode-ui/styles';
import { ThemeProvider } from 'next-themes';
import dynamic from 'next/dynamic';
import './global.embedded.css';

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
        <ThemeProvider
          forcedTheme="dark"
          attribute="class"
          value={{
            light: darkThemeClass,
            dark: darkThemeClass,
          }}
          enableSystem={true}
          enableColorScheme={true} // When enabled, we can't make the background of the embedded iframe transparent
        >
          <ErrorNotification>{children}</ErrorNotification>
        </ThemeProvider>
      </body>
    </html>
  );
}
