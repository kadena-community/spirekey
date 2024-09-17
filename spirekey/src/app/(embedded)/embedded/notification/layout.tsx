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
          light: 'light',
          dark: darkThemeClass,
        }}
      >
        {children}
      </ThemeProvider>
    </SettingsProvider>
  );
}
