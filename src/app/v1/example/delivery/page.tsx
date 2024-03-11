'use client';

import Customer from '@/app/v1/example/delivery/components/Customer/Customer';
import { OrderProvider } from '@/app/v1/example/delivery/context/OrderContext';
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
