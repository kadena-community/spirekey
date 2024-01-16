import { Children } from 'react';
import { carousel, carouselItem } from './Carousel.css';
type CarouselProps = {
  children: React.ReactNode;
};

export const Carousel = ({ children }: CarouselProps) => {
  return (
    <div className={carousel}>
      {Children.map(children, (child) => (
        <div className={carouselItem}>{child}</div>
      ))}
    </div>
  );
};
