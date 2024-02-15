import { Account } from '@/context/AccountsContext';
import { Heading, Stack } from '@kadena/react-ui';
import Link from 'next/link';
import { PlusCircle } from '../icons/PlusCircle';
import Card from './Card';
import { accountAlias, cardLink, plusIconContainer } from './Card.css';

interface Props {
  account: Account;
}

export default function AddDeviceCard({ account }: Props) {
  return (
    <Link
      href={`/accounts/${account.accountName}/devices/add`}
      className={cardLink}
    >
      <Card
        balancePercentage={0}
        title={
          <Heading as="h3" variant="h4" className={accountAlias}>
            Add Device
          </Heading>
        }
        center={
          <Stack justifyContent="center" className={plusIconContainer}>
            <PlusCircle />
          </Stack>
        }
      />
    </Link>
  );
}
