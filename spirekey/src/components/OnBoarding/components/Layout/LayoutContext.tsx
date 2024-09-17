import { Stack } from '@kadena/kode-ui';
import React, { FC, PropsWithChildren } from 'react';
import { gridContextClass, gridContextPlaceholderClass } from './Layout.css';

export const LayoutContext: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Stack className={gridContextPlaceholderClass} />
      <Stack marginBlock="xxl" width="100%" className={gridContextClass}>
        {children}
      </Stack>
    </>
  );
};
