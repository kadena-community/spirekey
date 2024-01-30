import { Heading, Stack, SystemIcon } from '@kadena/react-ui';
import {
  accountAlias, cardLink, plusIconContainer,
} from './Card.css';
import Card from './Card';
import { Account } from '@/context/AccountsContext';
import Link from 'next/link';

interface Props {
  account: Account,
}

export default function AddDeviceCard({ account }: Props) {
  return (
    <Link href={`/accounts/${account.accountName}/devices/add`} className={cardLink}>
      <Card
        balancePercentage={0}
        title={
          <Heading as="h3" variant="h4" className={accountAlias}>
            Add Device
          </Heading>
        }
        center={
          <Stack justifyContent="center" className={plusIconContainer}>
            <SystemIcon.Plus size='xl' />
          </Stack>
        }
      />
    </Link>
  );
}
