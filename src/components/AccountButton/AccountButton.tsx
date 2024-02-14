import Link from 'next/link';
import type { ComponentProps, ReactElement } from 'react';
import {
  button,
  buttonContent,
  description as descriptionStyle,
  iconContainer,
  title as titleStyle,
} from './AccountButton.css';
import { Box, Stack, Text } from '@kadena/react-ui';

interface Props extends Omit<ComponentProps<typeof Link>, 'color'> {
  icon: ReactElement,
  title: string;
  description: string;
}

export function AccountButton(props: Props) {
  const {icon, title, description, ...restProps} = props
  return (
    <Link className={button} {...restProps}>
      <Stack flexDirection="column" className={buttonContent}>
        <Box className={iconContainer}>
          {icon}
        </Box>
        <Stack flexDirection="column" paddingBlock="xs" style={{
        }}>
          <Text className={titleStyle}>{title}</Text>
          <Text className={descriptionStyle}>{description}</Text>
        </Stack>
      </Stack>
    </Link>
  );
}
