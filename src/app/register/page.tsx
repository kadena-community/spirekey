'use client';

import { Stack } from '@kadena/react-ui';
import Registration from '@/components/Registration/Registration';

export default function Register() {
  return (
    <Stack flexDirection="column" gap="md">
      <Registration />
    </Stack>
  );
}
