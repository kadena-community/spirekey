'use client';

import { darkThemeClass } from '@kadena/react-ui/theme';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

import { AccountsProvider } from '@/context/AccountContext';
import { AccountsProvider as NewAccountsProvider } from '@/context/AccountsContext';
import { NetworkProvider } from '@/context/NetworkContext';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <NetworkProvider defaultNetwork={process.env.NETWORK_ID || 'testnet04'}>
      <AccountsProvider>
        <NewAccountsProvider>
          <ThemeProvider
            attribute="class"
            enableSystem={false}
            value={{
              light: 'dark',
              dark: darkThemeClass,
            }}
          >
            {children}
          </ThemeProvider>
        </NewAccountsProvider>
      </AccountsProvider>
    </NetworkProvider>
  );
}
