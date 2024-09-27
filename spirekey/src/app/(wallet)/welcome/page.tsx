'use client';

import logo from '@/assets/images/SpireKey-logo.svg';
import { Background } from '@/components/Background/Background';
import { ButtonLink } from '@/components/shared/ButtonLink/ButtonLink';
import { Stack } from '@kadena/kode-ui';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Background />
      <Stack
        gap="md"
        flexDirection="column"
        justifyContent="space-around"
        width="100%"
        style={{ height: '100svh' }}
      >
        <Stack flexDirection="column" alignItems="center" gap="sm">
          <Image
            src={logo}
            alt="SpireKey logo"
            style={{ marginTop: '2rem', maxWidth: '50vw' }}
          />
        </Stack>
        <Stack flexDirection="row" justifyContent="center" gap="xl">
          <ButtonLink href={'/register'}>Register</ButtonLink>
        </Stack>
      </Stack>
    </>
  );
}
