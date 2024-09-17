import { Stack } from '@kadena/kode-ui';
import React, { FC, PropsWithChildren } from 'react';
import { gridActionsClass } from './Layout.css';

export const LayoutActions: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack
      marginBlockStart="xxxl"
      justifyContent="space-between"
      className={gridActionsClass}
    >
      {children}
    </Stack>
  );
};
