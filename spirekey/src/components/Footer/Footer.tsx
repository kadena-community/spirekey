'use client';
import { Stack, TextLink } from '@kadena/kode-ui';
import React, { FC } from 'react';
import { footerClass } from './style.css';

export const Footer: FC = () => {
  return (
    <Stack
      as="footer"
      gap="md"
      justifyContent="flex-end"
      width="100%"
      className={footerClass}
    >
      <TextLink
        href="https://discord.com/invite/kadena"
        target="_blank"
        isCompact
      >
        Discord
      </TextLink>
      <TextLink
        href="https://docs.kadena.io/build/authentication"
        target="_blank"
        isCompact
      >
        Help
      </TextLink>
      <TextLink
        href="https://www.kadena.io/privacy-policy"
        target="_blank"
        isCompact
      >
        Privacy
      </TextLink>
      <TextLink
        href="https://kadena.io/spirekey-license"
        target="_blank"
        isCompact
      >
        Terms
      </TextLink>
    </Stack>
  );
};
