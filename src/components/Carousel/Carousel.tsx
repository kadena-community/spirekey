import { Children } from 'react';
import {
  carousel,
  carouselItem,
  carouselItems,
  carouselNav,
  carouselNavItem,
} from './Carousel.css';
type CarouselProps = {
  children: React.ReactNode;
};

export const Carousel = ({ children }: CarouselProps) => {
  return (
    <div className={carousel}>
      <div className={carouselItems}>
        {Children.map(children, (child) => (
          <>
            <div className={carouselItem}>{child}</div>
            <div className={carouselItem}>{child}</div>
            <div className={carouselItem}>{child}</div>
            <div className={carouselItem}>{child}</div>
            <div className={carouselItem}>{child}</div>
          </>
        ))}
      </div>
      <ol className={carouselNav}>
        {Children.map(children, (child) => (
          <>
            <li className={carouselNavItem}></li>
            <li className={carouselNavItem}></li>
            <li className={carouselNavItem}></li>
            <li className={carouselNavItem}></li>
            <li className={carouselNavItem}></li>
          </>
        ))}
      </ol>
    </div>
  );
};
