import { Stack } from '@kadena/kode-ui';
import { FC } from 'react';
import { loaderClass, loaderSpinnerClass } from './styles.css';

export const Loader: FC = () => {
  return (
    <Stack className={loaderClass}>
      <Stack as="span" className={loaderSpinnerClass} />
    </Stack>
  );
};
