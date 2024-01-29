import { Account as TAccount } from '@/context/AccountsContext';
import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';

import Link from 'next/link';
import { Button } from '../Button/Button';
import Card from '../Card/Card';
import { Carousel } from '../Carousel/Carousel';
import { accountPosition } from './Account.css';
interface AccountProps {
  account: TAccount;
  onClick: (account: TAccount) => void;
  isCollapsed: boolean;
  isActive: boolean;
  returnUrl?: string;
}

function BaseAccount(
  { account, onClick, isActive, isCollapsed, returnUrl }: AccountProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      className={accountPosition}
      data-collapsed={isCollapsed}
      data-active={isActive}
    >
      <Carousel isActive={isActive}>
        {account.devices.map((d) => {
          const caccount = encodeURIComponent(account.accountName);
          const cid = encodeURIComponent(d['credential-id']);
          return (
            <div id={d['credential-id']}>
              <Card
                account={account}
                onClick={onClick}
                isActive={isActive}
                isCollapsed={isCollapsed}
              />
              {!returnUrl && isActive && (
                <>
                  <Link href={`/accounts/${caccount}/devices/add`}>add</Link> -
                  <Link href={`/accounts/${caccount}/devices/${cid}/send`}>
                    send
                  </Link>{' '}
                  -
                  <Link href={`/accounts/${caccount}/devices/${cid}/receive`}>
                    receive
                  </Link>{' '}
                  -
                  <Link
                    href={`/accounts/${caccount}/devices/${cid}/transactions`}
                  >
                    transactions
                  </Link>{' '}
                  -
                  <Link href={`/accounts/${caccount}/devices/${cid}#${cid}`}>
                    details
                  </Link>
                </>
              )}
              {returnUrl && (
                <>
                  <Button href={returnUrl}>Cancel</Button>

                  <Button
                    href={`${returnUrl}?response=${Buffer.from(
                      JSON.stringify({
                        displayName: account.accountName,
                        accountName: account.accountName,
                        cid,
                        publicKey: d.guard.keys[0],
                      }),
                    ).toString('base64')}`}
                  >
                    Login
                  </Button>
                </>
              )}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export const Account = forwardRef(BaseAccount);
