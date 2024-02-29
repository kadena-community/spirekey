'use client';

import Registration from '@/components/Registration/Registration';
import { Stack } from '@kadena/react-ui';

type Props = {
  searchParams: {
    redirectUrl?: string;
    networkId?: string;
  };
};

export default function Register({ searchParams }: Props) {
  const redirectUrl = searchParams.redirectUrl;
  const networkId = searchParams.networkId;

  return (
    <Stack flexDirection="column" gap="md">
      <Registration redirectUrl={redirectUrl} networkId={networkId} />
    </Stack>
  );
}
