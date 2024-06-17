'use client';

import type { Device } from '@kadena-spirekey/types';
import type { ICommand } from '@kadena/client';
import { Stack } from '@kadena/react-ui';
import dynamic from 'next/dynamic';

import { PageTitle } from '@/components/Layout/PageTitle';
import { MaskedValue } from '@/components/MaskedValue/MaskedValue';

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

  const decodedTransaction: ICommand | undefined = transaction
    ? JSON.parse(Buffer.from(transaction, 'base64').toString())
    : undefined;

  const decodedDevice: Device | undefined = device
    ? JSON.parse(Buffer.from(device || '{}', 'base64').toString())
    : undefined;

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
        transaction={decodedTransaction}
        device={decodedDevice}
      />
    </Stack>
  );
}
