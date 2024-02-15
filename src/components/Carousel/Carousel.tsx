import { Account } from '@/context/AccountsContext';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { Children } from 'react';
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
  hideAddDeviceCard = false,
}: CarouselProps) => (
  <>
    <div
      className={classNames({
        [carouselItems.default]: true,
        [carouselItems.nonScrollable]: !isActive,
      })}
    >
      <AnimatePresence>
        {!hideAddDeviceCard && isActive && (
          <motion.div
            initial={{ x: '-100px' }}
            animate={{ x: '0' }}
            exit={{ x: '-100px' }}
            transition={{ duration: 0.3 }}
            className={carouselItem({
              variant: !isActive ? 'nonScrollable' : undefined,
            })}
          >
            <AddDeviceCard account={account} />
          </motion.div>
        )}
      </AnimatePresence>
      {Children.map(children, (child, index) => (
        <div
          className={carouselItem({
            variant: !showCarouselItems(isActive, index) ? 'hidden' : undefined,
          })}
        >
          {child}
        </div>
      ))}
    </div>
    <ol className={carouselNav[isActive ? 'default' : 'hidden']}>
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
  </>
);
