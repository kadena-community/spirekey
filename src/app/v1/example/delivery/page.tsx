'use client';

import Customer from '@/components/Customer/Customer';
import { OrderProvider } from '@/context/OrderContext';
import React, { useEffect, useState } from 'react';

type DeliveryProps = {
  searchParams: {
    user: string;
    transaction: string;
  };
};

export default function DeliveryPage({ searchParams }: DeliveryProps) {
  return (
    <OrderProvider>
      <Customer searchParams={searchParams} />
    </OrderProvider>
  );
}
