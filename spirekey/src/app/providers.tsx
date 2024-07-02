'use client';

import { darkThemeClass } from '@kadena/react-ui/styles';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

import { NotificationContainer } from '@/components/shared/NotificationsContainer/NotificationsContainer';
import { AccountsProvider } from '@/context/AccountsContext';
import { SettingsProvider } from '@/context/SettingsContext';
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
  displayDevMode = true,
  enableColorScheme = true,
}: {
  children: ReactNode;
  displayDevMode?: boolean;
  enableColorScheme?: boolean;
}) {
  return (
    <SettingsProvider displayDevMode={displayDevMode}>
      <SWRConfig value={{ provider: localStorageProvider }}>
        <NotificationsProvider>
          <AccountsProvider>
            <ThemeProvider
              attribute="class"
              enableSystem={false}
              value={{
                dark: darkThemeClass,
              }}
              defaultTheme="light"
              enableColorScheme={enableColorScheme}
            >
              <>
                {children}
                <NotificationContainer />
              </>
            </ThemeProvider>
          </AccountsProvider>
        </NotificationsProvider>
      </SWRConfig>
    </SettingsProvider>
  );
}
