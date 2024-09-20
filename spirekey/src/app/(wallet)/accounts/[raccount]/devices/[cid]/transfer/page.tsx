'use client';
import SendForm from '@/components/SendForm/SendForm';
import { CardFixedContainer } from '@kadena/kode-ui/patterns';
import React from 'react';

export default function SendPage() {
  return (
    <CardFixedContainer>
      <SendForm />
    </CardFixedContainer>
  );
}
