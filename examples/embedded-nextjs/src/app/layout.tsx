import { atoms } from '@kadena/kode-ui/styles';
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
          backgroundColor: 'brand.secondary.default',
        })}
      >
        {children}
      </body>
    </html>
  );
}
