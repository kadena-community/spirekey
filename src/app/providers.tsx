'use client';

import { darkThemeClass } from '@kadena/react-ui/theme';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

import { AccountsProvider } from '@/context/AccountContext';
import { NetworkProvider } from '@/context/NetworkContext';
import { l1Client } from '@/utils/client';

export default function Providers({ children }: { children: ReactNode }) {
  const client = l1Client;

  return (
    <NetworkProvider>
      <AccountsProvider client={client}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          value={{
            light: 'light',
            dark: darkThemeClass,
          }}
        >
          {children}
        </ThemeProvider>
      </AccountsProvider>
    </NetworkProvider>
  );
}
