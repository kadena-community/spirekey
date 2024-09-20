'use client';
import SendForm from '@/components/SendForm/SendForm';
import {
  CardContentBlock,
  CardFixedContainer,
  CardFooterGroup,
} from '@kadena/kode-ui/patterns';
import React from 'react';

export default function SendPage() {
  return (
    <CardFixedContainer>
      <SendForm />
    </CardFixedContainer>
  );
}
