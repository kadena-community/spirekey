import { darkThemeClass } from '@kadena/kode-ui/styles';
import { ThemeProvider } from 'next-themes';

import { SettingsProvider } from '@/context/SettingsContext';

export default function NotificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SettingsProvider displayDevMode={false}>
      <ThemeProvider
        attribute="class"
        value={{
          dark: darkThemeClass,
        }}
        enableSystem={true}
        enableColorScheme={true} // When enabled, we can't make the background of the embedded iframe transparent
      >
        {children}
      </ThemeProvider>
    </SettingsProvider>
  );
}
