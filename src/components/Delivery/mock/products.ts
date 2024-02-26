import hawaiiImg from '@/app/v1/example/delivery/hawaii.webp';
import margheritaImg from '@/app/v1/example/delivery/margherita.webp';
import pepperoniImg from '@/app/v1/example/delivery/pepperoni.webp';
import veggieImg from '@/app/v1/example/delivery/veggie.webp';
import { StaticImageData } from 'next/image';

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
