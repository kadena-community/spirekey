import { Footer } from '@/components/Footer/Footer';
import { Stack } from '@kadena/kode-ui';
import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Stack flexDirection="column" flex={1} width="100%">
        {children}
      </Stack>
      <Footer />
    </>
  );
}
