import { Heading, Stack, Text } from '@kadena/kode-ui';
import { CardFixedContainer } from '@kadena/kode-ui/patterns';
import React, { FC, PropsWithChildren } from 'react';
import { cardContainerClass, gridContentClass } from './Layout.css';

interface IProps {
  title: string;
  description: string;
}

export const Layout: FC<PropsWithChildren<IProps>> = ({
  title,
  description,
  children,
}) => {
  return (
    <Stack flexDirection="column" flex={1}>
      <CardFixedContainer className={cardContainerClass}>
        <Stack gap="xl" flexDirection="column" className={gridContentClass}>
          <Heading>{title}</Heading>
          <Text>
            <>{description}</>
          </Text>
        </Stack>
        <>{children}</>
      </CardFixedContainer>
    </Stack>
  );
};
