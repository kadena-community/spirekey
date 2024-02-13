import { Account } from '@/context/AccountsContext';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { Children } from 'react';
import AddDeviceCard from '../Card/AddDeviceCard';
import { Plus } from '../icons/Plus';
import {
  carousel,
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
};

const showCarouselItems = (isActive: boolean, index: number) => {
  if (isActive) return true;
  if (index === 0) return true;
  return false;
};

export const Carousel = ({ account, children, isActive }: CarouselProps) => {
  return (
    <div className={carousel}>
      <div
        className={classNames({
          [carouselItems.default]: true,
          [carouselItems.nonScrollable]: !isActive,
        })}
      >
        {isActive && (
          <AnimatePresence>
            <motion.div
              initial={{ transform: 'translateX(-100%)' }}
              animate={{ transform: 'translateX(0)' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={carouselItem({
                variant: !isActive ? 'nonScrollable' : undefined,
              })}
            >
              <AddDeviceCard account={account} />
            </motion.div>
          </AnimatePresence>
        )}
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
      <ol className={carouselNav[isActive ? 'default' : 'hidden']}>
        <li className={carouselAddItem}>
          <Plus />
        </li>
        {Children.map(children, () => (
          <li className={carouselNavItem({ variant: 'active' })} /> // @ TODO set variant when actually active
        ))}
      </ol>
    </div>
  );
};
