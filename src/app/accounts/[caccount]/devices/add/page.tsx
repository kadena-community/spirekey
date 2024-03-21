'use client';

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
      <AddDevice
        caccount={caccount}
        transaction={transaction}
        device={device}
      />
    </Stack>
  );
}
