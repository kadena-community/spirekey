import classNames from 'classnames';
import { Children } from 'react';
import {
  carousel,
  carouselItem,
  carouselItems,
  carouselNav,
  carouselNavItem,
} from './Carousel.css';
import AddDeviceCard from '../Card/AddDeviceCard';

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
        {isActive &&
          <div
            className={classNames({
              [carouselItem.default]: true,
              [carouselItem.nonScrollable]: !isActive,
            })}
          >
            <AddDeviceCard />
          </div>
        }
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
      <ol className={carouselNav[isActive ? 'default' : 'hidden']}>
        <li className={carouselNavItem} />
        {Children.map(children, () => (
          <li className={carouselNavItem} />
        ))}
      </ol>
    </div>
  );
};
