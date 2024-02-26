import { StaticImageData } from 'next/image';
import { createContext, useContext, useEffect, useState } from 'react';
import hawaiiImg from '../app/v1/example/delivery/hawaii.webp';
import margheritaImg from '../app/v1/example/delivery/margherita.webp';
import pepperoniImg from '../app/v1/example/delivery/pepperoni.webp';
import veggieImg from '../app/v1/example/delivery/veggie.webp';

export interface Product {
  name: string;
  price: number;
  image: StaticImageData;
}

export const products: Product[] = [
  {
    name: 'Pizza Peperroni',
    image: pepperoniImg,
    price: 18.0,
  },
  {
    name: 'Pizza Margherita',
    image: margheritaImg,
    price: 7.99,
  },
  {
    name: 'Pizza Hawaii',
    image: hawaiiImg,
    price: 49.0,
  },
  {
    name: 'Veggie Pizza',
    image: veggieImg,
    price: 10.0,
  },
];

export type OrderItems = string[];

const defaultOrderItems: OrderItems = [];

const defaultState = {
  products,
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

  const addOrderItem = (productName: string): void => {
    setOrderItems((value) => [...value, productName]);
  };

  const removeOrderItem = (productName: string): void => {
    const otherOrderItems = orderItems.filter(
      (orderItem) => orderItem !== productName,
    );
    const productOrderItems = orderItems.filter(
      (orderItem) => orderItem === productName,
    );
    productOrderItems.pop();
    setOrderItems([...otherOrderItems, ...productOrderItems]);
  };

  useEffect(() => {
    setOrderTotalPrice(
      products.reduce((total, product) => {
        return (
          total +
          orderItems.filter((orderItem) => orderItem === product.name).length *
            product.price
        );
      }, 0),
    );
  }, [products, orderItems]);

  return (
    <OrderContext.Provider
      value={{
        products,
        orderItems,
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
