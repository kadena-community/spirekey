'use client';

import Registration from '@/components/Registration/Registration';
import { Stack } from '@kadena/react-ui';

type Props = {
  searchParams: {
    redirectUrl?: string;
  };
};

export default function Register({ searchParams }: Props) {
  const redirectUrl = searchParams.redirectUrl;
  
  return (
    <Stack flexDirection="column" gap="md">
      <Registration redirectUrl={redirectUrl} />
    </Stack>
  );
}
