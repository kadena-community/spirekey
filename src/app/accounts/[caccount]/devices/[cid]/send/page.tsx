'use client';

import React from 'react';
import { Box } from '@kadena/react-ui';
import dynamic from 'next/dynamic';

const SendForm = dynamic(
  () => import('@/components/SendForm/SendForm'),
  { ssr: false },
);

export default function SendPage() {
  return (
    <Box margin="lg">
      <h1>Send</h1>
      <SendForm />
    </Box>
  );
}
