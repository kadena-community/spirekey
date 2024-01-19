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
  isActive: boolean;
};

import classNames from 'classnames';

const showCarouselItems = (isActive: boolean, index: number) => {
  if (isActive) return true;
  if (index === 0) return true;
  return false;
};

export const Carousel = ({ children, isActive }: CarouselProps) => {
  return (
    <div className={carousel}>
      <div className={carouselItems}>
        {Children.map(children, (child, index) => (
          <div
            className={classNames({
              [carouselItem.default]: true,
              [carouselItem.hidden]: !showCarouselItems(isActive, index),
            })}
          >
            {child}
          </div>
        ))}
      </div>
      {Children.count(children) > 1 && (
        <ol className={carouselNav[isActive ? 'default' : 'hidden']}>
          {Children.map(children, () => (
            <li className={carouselNavItem} />
          ))}
        </ol>
      )}
    </div>
  );
};
