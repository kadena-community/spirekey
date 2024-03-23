'use client';

import { PageTitle } from '@/components/Layout/PageTitle';
import { MaskedValue } from '@/components/MaskedValue/MaskedValue';
import { Heading, Stack } from '@kadena/react-ui';
import dynamic from 'next/dynamic';
import * as styles from './page.css';

const AddDevice = dynamic(() => import('@/components/AddDevice/AddDevice'), {
  ssr: false,
});

interface Props {
  searchParams: {
    transaction?: string;
    device?: string;
  };
  params: {
    caccount: string;
  };
}

export default function AddDevicePage(req: Props) {
  const caccount = decodeURIComponent(req.params.caccount);
  const { transaction, device } = req.searchParams;

  return (
    <Stack flexDirection="column" gap="md">
      <PageTitle>Add device to account</PageTitle>
      <Stack paddingInline="lg" width="100%">
        <MaskedValue
          value={caccount}
          className={styles.account}
          startUnmaskedValues={8}
        />
      </Stack>
      <AddDevice
        caccount={caccount}
        transaction={transaction}
        device={device}
      />
    </Stack>
  );
}
