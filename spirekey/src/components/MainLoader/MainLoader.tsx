import { Stack } from '@kadena/kode-ui';
import { FC } from 'react';
import { Loader } from './Loader';

export const MainLoader: FC = () => {
  return (
    <Stack width="100%" style={{ height: '100dvh' }}>
      <Loader />;
    </Stack>
  );
};
