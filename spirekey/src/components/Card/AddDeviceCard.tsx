import type { Account } from '@kadena/spirekey-types';
import { Heading, Stack } from '@kadena/react-ui';
import Link from 'next/link';

import { PlusCircle } from '@/components/icons/PlusCircle';

import Card from './Card';
import * as styles from './Card.css';

interface Props {
  account: Account;
}

export default function AddDeviceCard({ account }: Props) {
  return (
    <Link
      href={`/accounts/${account.accountName}/devices/add`}
      className={styles.cardLink}
    >
      <Card
        balancePercentage={0}
        title={
          <Heading as="h3" variant="h4" className={styles.accountAlias}>
            Add Device
          </Heading>
        }
        center={
          <Stack justifyContent="center" className={styles.plusIconContainer}>
            <PlusCircle />
          </Stack>
        }
      />
    </Link>
  );
}
