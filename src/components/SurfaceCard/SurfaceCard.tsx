import { Box, Heading, Text } from '@kadena/react-ui';
import type { FC, ReactNode } from 'react';
import { Surface } from '../Surface/Surface';

interface Props {
  title?: string;
  description?: string | ReactNode;
  onClick?: () => void;
  children: React.ReactNode;
}

export const SurfaceCard: FC<Props> = ({
  title,
  description,
  children,
  onClick = () => {},
}) => {
  return (
    <Surface onClick={onClick}>
      <Box marginBlockEnd="lg">
        <Heading variant="h5">{title}</Heading>
        <Text>{description}</Text>
      </Box>
      <Surface>{children}</Surface>
    </Surface>
  );
};
