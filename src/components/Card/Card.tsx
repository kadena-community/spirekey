import { Account } from '@/context/AccountsContext';
import { Heading, MaskedValue, Text } from '@kadena/react-ui';
import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';

import { AccountDetails } from '../AccountDetails/AccountDetails';
import { card, cardPosition } from './Card.css';

interface CardProps {
  account: Account;
  onClick: (account: Account) => void;
  isCollapsed: boolean;
  isActive: boolean;
}

function BaseCard(
  { account, onClick, isActive, isCollapsed }: CardProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      className={cardPosition}
      data-collapsed={isCollapsed}
      data-active={isActive}
    >
      <div className={card} onClick={() => onClick(account)}>
        <Heading variant="h5" as="h2">
          {account.devices.map((d: any) => d.identifier).join(', ')}
        </Heading>

        <MaskedValue value={account.accountName} />

        <Text>{account.network}</Text>
      </div>
      {isActive && <AccountDetails account={account} />}
    </div>
  );
}

export const Card = forwardRef(BaseCard);
