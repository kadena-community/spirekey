'use client';

import logo from '@/assets/images/bennuKey.svg';
import { ButtonLink } from '@/components/ButtonLink/ButtonLink';
import { Heading, Stack } from '@kadena/react-ui';
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
      <Stack flexDirection="column" alignItems="center">
        <Image src={logo} alt="BennuKey logo" style={{ marginTop: '2rem' }} />
        <Heading variant="h5" as="h2" style={{ lineHeight: 0.8 }}>
          BennuKey
        </Heading>
        <Heading
          variant="h3"
          as="h1"
          style={{ marginTop: 0, lineHeight: 0.8, marginBottom: '2rem' }}
        >
          Wallet
        </Heading>
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
