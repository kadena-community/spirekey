import { CardContentBlock, CardFixedContainer } from '@kadena/kode-ui/patterns';
import React, { FC, PropsWithChildren } from 'react';

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
    <CardFixedContainer>
      <CardContentBlock title={title} description={description}>
        {children}
      </CardContentBlock>
    </CardFixedContainer>
  );
};
