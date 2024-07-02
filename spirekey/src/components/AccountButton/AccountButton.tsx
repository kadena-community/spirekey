import { Stack, Text } from '@kadena/kode-ui';
import Link from 'next/link';
import type { ComponentProps, ReactElement } from 'react';
import * as styles from './AccountButton.css';

interface Props extends Omit<ComponentProps<typeof Link>, 'color'> {
  icon: ReactElement;
  title: string;
  description: string;
}

export function AccountButton(props: Props) {
  const { icon, title, description, ...restProps } = props;

  return (
    <Link className={styles.button} {...restProps}>
      <Stack flexDirection="column" className={styles.buttonContent}>
        <Stack className={styles.iconContainer}>{icon}</Stack>
        <Stack flexDirection="column" paddingBlock="xs">
          <Text className={styles.title}>{title}</Text>
          <Text className={styles.description}>{description}</Text>
        </Stack>
      </Stack>
    </Link>
  );
}
