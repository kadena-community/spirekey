import { atoms, darkThemeClass } from '@kadena/kode-ui/styles';
import { ThemeProvider } from 'next-themes';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={atoms({
          backgroundColor: 'surface.default',
        })}
      >
        <ThemeProvider
          forcedTheme="light"
          attribute="class"
          value={{
            light: 'light',
            dark: darkThemeClass,
          }}
          enableSystem={true}
          enableColorScheme={true} // When enabled, we can't make the background of the embedded iframe transparent
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
