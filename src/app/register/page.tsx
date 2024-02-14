'use client';

import { Stack } from '@kadena/react-ui';
import Registration from '@/components/Registration/Registration';

type Props = {
  searchParams: {
    redirectUrl?: string;
  };
};

export default function Register({ searchParams }: Props) {
  const redirectUrl = searchParams.redirectUrl
  return (
    <Stack flexDirection="column" gap="md">
      <Registration redirectUrl={redirectUrl} />
    </Stack>
  );
}
