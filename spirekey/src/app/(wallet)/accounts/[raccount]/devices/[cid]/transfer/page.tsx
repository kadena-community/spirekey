'use client';
import SendForm from '@/components/SendForm/SendForm';
import { Card } from '@kadena/kode-ui';
import React from 'react';

export default function SendPage() {
  return (
    <Card fullWidth>
      <SendForm />
    </Card>
  );
}
