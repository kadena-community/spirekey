import classNames from 'classnames';
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

const showCarouselItems = (isActive: boolean, index: number) => {
  if (isActive) return true;
  if (index === 0) return true;
  return false;
};

export const Carousel = ({ children, isActive }: CarouselProps) => {
  return (
    <div className={carousel}>
      <div
        className={classNames({
          [carouselItems.default]: true,
          [carouselItems.nonScrollable]: !isActive,
        })}
      >
        <div // REPLACE WITh ADD CARD
          className={classNames({
            [carouselItem.default]: true,
            [carouselItem.nonScrollable]: !isActive,
          })}
        >
          ADD
        </div>
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
