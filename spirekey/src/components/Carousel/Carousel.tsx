import type { Account } from '@kadena-spirekey/types';
import classNames from 'classnames';
import { Children, useLayoutEffect, useRef, useState } from 'react';
import { InView } from 'react-intersection-observer';

import * as styles from './Carousel.css';

type CarouselProps = {
  account: Account;
  children: React.ReactNode;
  isActive: boolean;
  delayedIsActive: boolean;
  hideAddDeviceCard?: boolean;
};

const showCarouselItems = (isActive: boolean, index: number) => {
  if (isActive) return true;
  if (index === 0) return true;
  return false;
};

export const Carousel = ({
  children,
  isActive,
  delayedIsActive,
  hideAddDeviceCard = false,
}: CarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useLayoutEffect(() => {
    if (delayedIsActive && containerRef.current) {
      containerRef.current.scrollLeft = itemRef.current?.offsetWidth || 0;
    }
  }, [delayedIsActive]);

  const onChangeCard = (inView: boolean, index: number) => {
    if (inView) {
      setActiveIndex(index);
    }
  };

  const scrollToCard = (index: number) => () => {
    containerRef.current?.scrollTo({
      left:
        ((containerRef.current?.children[index] as HTMLDivElement).offsetLeft ||
          0) * index,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div
        ref={containerRef}
        className={classNames({
          [styles.carouselItems.default]: true,
          [styles.carouselItems.nonScrollable]: !isActive,
        })}
      >
        {Children.map(children, (child, index) => (
          <InView
            as="div"
            onChange={(inView) => onChangeCard(inView, index)}
            threshold={1}
            key={index}
            className={styles.carouselItem({
              variant: !showCarouselItems(isActive, index)
                ? 'hidden'
                : undefined,
            })}
          >
            {child}
          </InView>
        ))}
      </div>
      {delayedIsActive && (
        <ol className={styles.carouselNav}>
          {Children.count(children) > 1 &&
            !hideAddDeviceCard &&
            Children.map(children, (_child, index) => (
              <li
                onClick={scrollToCard(index)}
                className={styles.carouselNavItem({
                  variant: index === activeIndex ? 'active' : 'default',
                })}
              />
            ))}
        </ol>
      )}
    </>
  );
};
