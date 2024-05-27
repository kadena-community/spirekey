import { Heading, Stack } from '@kadena/react-ui';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  append?: ReactNode;
}
export const PageTitle: FC<Props> = ({ children, append }) => (
  <Stack
    paddingInline="lg"
    paddingBlock="md"
    alignItems="center"
    justifyContent="space-between"
    width="100%"
    flexDirection="row"
  >
    <Heading variant="h5">{children}</Heading>
    {append}
  </Stack>
);
