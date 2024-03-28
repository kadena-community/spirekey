import { Heading, Stack } from '@kadena/react-ui';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
export const PageTitle: FC<Props> = ({ children }) => (
  <Stack
    paddingInline="lg"
    paddingBlock="md"
    alignItems="center"
    justifyContent="space-between"
    width="100%"
  >
    <Heading variant="h5">{children}</Heading>
  </Stack>
);
