import { Account } from '@/context/AccountsContext';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { Children, useLayoutEffect, useRef } from 'react';
import AddDeviceCard from '../Card/AddDeviceCard';
import { Plus } from '../icons/Plus';
import {
  carouselAddItem,
  carouselItem,
  carouselItems,
  carouselNav,
  carouselNavItem,
} from './Carousel.css';

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
  account,
  children,
  isActive,
  delayedIsActive,
  hideAddDeviceCard = false,
}: CarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (delayedIsActive && containerRef.current) {
      containerRef.current.scrollLeft = itemRef.current?.offsetWidth || 0;
    }
  }, [delayedIsActive]);

  return (
    <>
      <div
        ref={containerRef}
        className={classNames({
          [carouselItems.default]: true,
          [carouselItems.nonScrollable]: !isActive,
        })}
      >
        <AnimatePresence>
          {!hideAddDeviceCard && delayedIsActive && (
            <motion.div
              initial={{ x: '-100px' }}
              animate={{ x: '0' }}
              exit={{ x: '-100px' }}
              transition={{ duration: 0.3 }}
              className={carouselItem({
                variant: !delayedIsActive ? 'nonScrollable' : undefined,
              })}
              ref={itemRef}
            >
              <AddDeviceCard account={account} />
            </motion.div>
          )}
        </AnimatePresence>
        {Children.map(children, (child, index) => (
          <div
            className={carouselItem({
              variant: !showCarouselItems(isActive, index)
                ? 'hidden'
                : undefined,
            })}
          >
            {child}
          </div>
        ))}
      </div>
      {delayedIsActive && (
        <ol className={carouselNav}>
          {!hideAddDeviceCard && (
            <li className={carouselAddItem}>
              <Plus />
            </li>
          )}
          {(Children.count(children) > 1 || !hideAddDeviceCard) &&
            Children.map(children, () => (
              <li className={carouselNavItem({ variant: 'active' })} /> // @ TODO set variant when actually active
            ))}
        </ol>
      )}
    </>
  );
};
