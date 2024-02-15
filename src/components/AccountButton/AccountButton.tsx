import Link from 'next/link';
import type { ComponentProps, ReactElement } from 'react';
import * as style from './AccountButton.css';
import { Stack, Text } from '@kadena/react-ui';

interface Props extends Omit<ComponentProps<typeof Link>, 'color'> {
  icon: ReactElement,
  title: string;
  description: string;
}

export function AccountButton(props: Props) {
  const {icon, title, description, ...restProps} = props
  return (
    <Link className={style.button} {...restProps}>
      <Stack flexDirection="column" className={style.buttonContent}>
        <Stack className={style.iconContainer}>
          {icon}
        </Stack>
        <Stack flexDirection="column" paddingBlock="xs">
          <Text className={style.title}>{title}</Text>
          <Text className={style.description}>{description}</Text>
        </Stack>
      </Stack>
    </Link>
  );
}
