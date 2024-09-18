import { Stack } from '@kadena/kode-ui';
import React, { FC, PropsWithChildren } from 'react';
import { gridContextClass, gridContextPlaceholderClass } from './Layout.css';

export const LayoutContext: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Stack className={gridContextPlaceholderClass} width="100%" />
      <Stack
        marginBlock="xxl"
        width="100%"
        alignItems="center"
        justifyContent="center"
        className={gridContextClass}
      >
        {children}
      </Stack>
    </>
  );
};
