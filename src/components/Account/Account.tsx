import { type Account } from '@/context/AccountsContext';

import Link from 'next/link';
import { ButtonLink } from '../ButtonLink/ButtonLink';
import DeviceCard from '../Card/DeviceCard';
import { Carousel } from '../Carousel/Carousel';
interface AccountProps {
  account: Account;
  onClick?: (account: Account) => void;
  isCollapsed?: boolean;
  isActive?: boolean;
  returnUrl?: string;
}

export function Account({
  account,
  onClick,
  isActive = false,
  isCollapsed = false,
  returnUrl,
}: AccountProps) {
  return (
    <Carousel account={account} isActive={isActive}>
      {account.devices.map((d) => {
        const caccount = encodeURIComponent(account.accountName);
        const cid = encodeURIComponent(d['credential-id']);

        return (
          <div key={d['credential-id']}>
            <DeviceCard account={account} onClick={onClick} />
            {!returnUrl && isActive && (
              <>
                <Link href={`/accounts/${caccount}/devices/${cid}/fund`}>
                  fund
                </Link>{' '}
                -
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
            {returnUrl && isActive && (
              <>
                <ButtonLink href={returnUrl}>Cancel</ButtonLink>

                <ButtonLink
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
                </ButtonLink>
              </>
            )}
          </div>
        );
      })}
    </Carousel>
  );
}
