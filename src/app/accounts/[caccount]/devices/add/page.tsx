'use client';

import { PageTitle } from '@/components/Layout/PageTitle';
import { Stack } from '@kadena/react-ui';
import dynamic from 'next/dynamic';

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
      <PageTitle>Add device</PageTitle>
      <AddDevice
        caccount={caccount}
        transaction={transaction}
        device={device}
      />
    </Stack>
  );
}
