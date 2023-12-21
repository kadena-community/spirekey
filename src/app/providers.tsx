'use client';

import { darkThemeClass } from '@kadena/react-ui/theme';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

import { AccountsProvider } from '@/context/AccountContext';
import { NetworkProvider } from '@/context/NetworkContext';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <NetworkProvider defaultNetwork={process.env.NETWORK_ID || 'testnet04'}>
      <AccountsProvider>
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
