'use client';

import logo from '@/assets/images/SpireKey-logo.svg';
import { Footer } from '@/components/Footer/Footer';
import { ButtonLink } from '@/components/shared/ButtonLink/ButtonLink';
import { Stack, Text } from '@kadena/kode-ui';
import { CardFixedContainer } from '@kadena/kode-ui/patterns';
import Image from 'next/image';

import React from 'react';

export default function Home() {
  return (
    <Stack
      flexDirection="column"
      justifyContent="center"
      style={{ height: '100' }}
      flex={1}
    >
      <CardFixedContainer>
        <Stack flexDirection="column" gap="md" marginBlock="xl">
          <Image src={logo} alt="SpireKey logo" style={{ maxWidth: '50vw' }} />

          <Stack
            flexDirection="column"
            justifyContent="center"
            gap="xl"
            marginBlockStart="xl"
          >
            <Text>
              Kadena SpireKey leverages web authentication standards to provide
              a secure backend that enables end users to securely generate and
              store key pairs directly on their hardware devices.
            </Text>
            <Stack alignItems="center" justifyContent="flex-end" gap="md">
              <Text size="small">No account yet?</Text>
              <ButtonLink href="/register">Register</ButtonLink>
            </Stack>
          </Stack>
        </Stack>
      </CardFixedContainer>
      <Footer />
    </Stack>
  );
}
