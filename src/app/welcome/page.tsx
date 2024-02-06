'use client';

import logo from '@/assets/images/SpireKey-logo.svg';
import { ButtonLink } from '@/components/ButtonLink/ButtonLink';
import { Stack } from '@kadena/react-ui';
import Image from 'next/image';

export default function Home() {
  return (
    <Stack
      gap="md"
      flexDirection="column"
      justifyContent="space-around"
      width="100%"
      style={{ height: '100svh' }}
    >
      <Stack flexDirection="column" alignItems="center" gap="sm">
        <Image src={logo} alt="BennuKey logo" style={{ marginTop: '2rem' }} />
      </Stack>
      <Stack flexDirection="row" justifyContent="center" gap="xl">
        <ButtonLink href={'/recover'} variant="secondary">
          Recover
        </ButtonLink>
        <ButtonLink href={'/register'}>Register</ButtonLink>
      </Stack>
    </Stack>
  );
}
