import { Heading, Stack, Text } from '@kadena/kode-ui';
import React, { FC, PropsWithChildren } from 'react';
import { sectionClass } from './style.css';

interface IProps {
  label: string;
}

export const AccountOverviewSection: FC<PropsWithChildren<IProps>> = ({
  label,
  children,
}) => {
  return (
    <Stack flexDirection="column" className={sectionClass}>
      <Heading as="h6">{label}</Heading>
      <Text variant="code">{children}</Text>
    </Stack>
  );
};
