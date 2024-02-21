'use client';

import { darkThemeClass } from '@kadena/react-ui/styles';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

import { AccountsProvider } from '@/context/AccountsContext';
import { SWRConfig } from 'swr';

function localStorageProvider() {
  if (typeof window === 'undefined') return new Map();
  // When initializing, we restore the data from `localStorage` into a map.
  const map = new Map(JSON.parse(localStorage.getItem('app-cache') || '[]'));

  // Before unloading the app, we write back all the data into `localStorage`.
  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem('app-cache', appCache);
  });

  // We still use the map for write & read for performance.
  return map as any;
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SWRConfig value={{ provider: localStorageProvider }}>
      <AccountsProvider>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          value={{
            dark: darkThemeClass,
          }}
          defaultTheme="dark"
        >
          {children}
        </ThemeProvider>
      </AccountsProvider>
    </SWRConfig>
  );
}
