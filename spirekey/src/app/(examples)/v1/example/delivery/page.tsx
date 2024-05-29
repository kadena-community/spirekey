'use client';

import Customer from '@/app/(examples)/v1/example/delivery/components/Customer/Customer';
import { OrderProvider } from '@/app/(examples)/v1/example/delivery/context/OrderContext';

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
