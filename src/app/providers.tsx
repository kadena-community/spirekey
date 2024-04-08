'use client';

import { darkThemeClass } from '@kadena/react-ui/styles';
import { ThemeProvider } from 'next-themes';
import { ReactNode, useEffect } from 'react';

import { NotificationContainer } from '@/components/shared/NotificationsContainer/NotificationsContainer';
import { AccountsProvider } from '@/context/AccountsContext';
import { NotificationsProvider } from '@/context/shared/NotificationsContext';
import { SWRConfig } from 'swr';

function localStorageProvider() {
  if (typeof window === 'undefined') return new Map();
  // When initializing, we restore the data from `localStorage` into a map.
  const map = new Map(JSON.parse(localStorage.getItem('app-cache') || '[]'));

  // Before unloading the app, we write back all the data into `localStorage`.
  window.addEventListener('beforeunload', () => {
    const inMemoryCache = Array.from(map.entries()).filter((e) => {
      try {
        JSON.stringify(e);
        return true;
      } catch (error) {
        // this is probably a circular reference
        // we can't store this in localStorage
        return false;
      }
    });
    const appCache = JSON.stringify(inMemoryCache);
    localStorage.setItem('app-cache', appCache);
  });

  // We still use the map for write & read for performance.
  return map as any;
}

export default function Providers({
  children,
  allowDevMode = true,
}: {
  children: ReactNode;
  allowDevMode?: boolean;
}) {
  useEffect(() => {
    if (!allowDevMode) return;
    const devMode: boolean = !!localStorage.getItem('devMode');
    if (!devMode) return;
    devMode && document.body.classList.add('developer');
  });

  return (
    <SWRConfig value={{ provider: localStorageProvider }}>
      <NotificationsProvider>
        <AccountsProvider>
          <ThemeProvider
            attribute="class"
            enableSystem={false}
            value={{
              dark: darkThemeClass,
            }}
            defaultTheme="dark"
          >
            <>
              {children}
              <NotificationContainer />
            </>
          </ThemeProvider>
        </AccountsProvider>
      </NotificationsProvider>
    </SWRConfig>
  );
}
