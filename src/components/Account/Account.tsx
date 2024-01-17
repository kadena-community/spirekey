import { Account as TAccount } from '@/context/AccountsContext';
import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';

import { AccountDetails } from '../AccountDetails/AccountDetails';
import Card from '../Card/Card';
import { Carousel } from '../Carousel/Carousel';
import { accountPosition } from './Account.css';

interface AccountProps {
  account: TAccount;
  onClick: (account: TAccount) => void;
  isCollapsed: boolean;
  isActive: boolean;
}

function BaseAccount(
  { account, onClick, isActive, isCollapsed }: AccountProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      className={accountPosition}
      data-collapsed={isCollapsed}
      data-active={isActive}
    >
      <Carousel>
        {account.devices.map((d) => (
          <Card
            account={account}
            onClick={onClick}
            isActive={isActive}
            isCollapsed={isCollapsed}
          />
        ))}
      </Carousel>
    </div>
  );
}

export const Account = forwardRef(BaseAccount);
