import { products } from '@/app/(examples)/v1/example/delivery/mock/products';
import kadenaK from '@/assets/images/k.svg';
import { StaticImageData } from 'next/image';
import { createContext, useContext, useEffect, useState } from 'react';

export interface Product {
  name: string;
  price: number;
  image: StaticImageData;
}

type OrderItem = Product & {
  quantity: number;
};
export type OrderItems = OrderItem[];

const defaultOrderItems: OrderItems = [];

const defaultState = {
  products,
  deliveryFee: {
    image: kadenaK.src,
    name: 'Delivery Fee',
    price: 6.25,
    quantity: 1,
  },
  orderItems: defaultOrderItems,
  addOrderItem: (productName: string) => {},
  removeOrderItem: (productName: string) => {},
  orderTotalPrice: 0,
};

export const OrderContext = createContext(defaultState);

type Props = {
  children: React.ReactNode;
};

const OrderProvider = ({ children }: Props) => {
  const [orderItems, setOrderItems] = useState<OrderItems>(
    defaultState.orderItems,
  );
  const [orderTotalPrice, setOrderTotalPrice] = useState<number>(0);

  const addOrderItem = (productName: string): void =>
    setOrderItems((value) => {
      const existingOrderItem = value.find(
        (orderItem) => orderItem.name === productName,
      );
      if (!existingOrderItem)
        return [
          ...value,
          {
            ...products.find((product) => product.name === productName)!,
            quantity: 1,
          },
        ];
      return value.map((orderItem) =>
        orderItem.name === productName
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem,
      );
    });

  const removeOrderItem = (productName: string): void =>
    setOrderItems((value) =>
      value
        .map((orderItem) =>
          orderItem.name === productName
            ? { ...orderItem, quantity: orderItem.quantity - 1 }
            : orderItem,
        )
        .filter((orderItem) => orderItem.quantity > 0),
    );

  useEffect(() => {
    setOrderTotalPrice(
      orderItems.reduce(
        (acc, orderItem) => acc + orderItem.price * orderItem.quantity,
        0,
      ),
    );
  }, [products, orderItems]);

  return (
    <OrderContext.Provider
      value={{
        products,
        orderItems,
        deliveryFee: defaultState.deliveryFee,
        addOrderItem,
        removeOrderItem,
        orderTotalPrice,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within a OrderProvider');
  }
  return context;
};

export { OrderProvider, useOrder };
