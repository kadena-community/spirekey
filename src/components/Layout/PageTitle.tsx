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
    justifyContent="center"
    width="100%"
    flexDirection="row"
  >
    <Heading>{children}</Heading>
    {append}
  </Stack>
);
