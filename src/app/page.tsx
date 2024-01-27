'use client';

import { useAccounts } from '@/hooks/useAccounts';
import {
  Heading,
  Link,
  Stack,
} from '@kadena/react-ui';
import Image from 'next/image';
import logo from '@/assets/images/bennuKey.svg';

export default function Home() {
  const { accounts } = useAccounts();

  return (
    <Stack
      gap="md"
      flexDirection="column"
      justifyContent="space-around"
      width="100%"
      style={{ height: '100svh' }}
    >
      <Stack
        flexDirection="column"
        alignItems="center"
      >
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
      <Stack
        flexDirection="row"
        justifyContent="center"
        gap="md"
      >
        {accounts.length > 0 && <Link href={'/accounts'}>Accounts</Link>}
        <Link href={'/restore'}>Restore</Link>
        <Link href={'/register'}>Register</Link>
      </Stack>
    </Stack>
  );
}