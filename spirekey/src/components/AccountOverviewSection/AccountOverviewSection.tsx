import { Heading, Stack, Text } from '@kadena/kode-ui';
import React, { FC, PropsWithChildren } from 'react';
import { sectionClass, sectionTextClass } from './style.css';

interface IProps {
  label: string;
}

export const AccountOverviewSection: FC<PropsWithChildren<IProps>> = ({
  label,
  children,
}) => {
  return (
    <Stack flexDirection="column" className={sectionClass} gap="xs">
      <Heading as="h6">{label}</Heading>
      <Text
        size="small"
        variant="code"
        color="emphasize"
        className={sectionTextClass}
      >
        {children}
      </Text>
    </Stack>
  );
};
