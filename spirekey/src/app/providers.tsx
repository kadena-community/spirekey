'use client';

import { NotificationContainer } from '@/components/shared/NotificationsContainer/NotificationsContainer';
import { SettingsProvider } from '@/context/SettingsContext';
import { NotificationsProvider } from '@/context/shared/NotificationsContext';
import { apolloClient } from '@/hooks/useQuery';
import { ApolloProvider } from '@apollo/client';
import { darkThemeClass } from '@kadena/kode-ui/styles';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
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
      } catch (_) {
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
}: {
  children: ReactNode;
  displayDevMode?: boolean;
}) {
  return (
    <SettingsProvider displayDevMode={displayDevMode}>
      <SWRConfig value={{ provider: localStorageProvider }}>
        <ApolloProvider client={apolloClient}>
          <NotificationsProvider>
            <ThemeProvider
              attribute="class"
              value={{
                light: 'light',
                dark: darkThemeClass,
              }}
              enableSystem={true}
              enableColorScheme={true} // When enabled, we can't make the background of the embedded iframe transparent
            >
              <>
                {children}
                <NotificationContainer />
              </>
            </ThemeProvider>
          </NotificationsProvider>
        </ApolloProvider>
      </SWRConfig>
    </SettingsProvider>
  );
}
