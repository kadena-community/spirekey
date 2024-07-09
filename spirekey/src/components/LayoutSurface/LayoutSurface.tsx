import { SpireKeyKdacolorLogoGreen } from '@kadena/kode-icons/product';
import { Grid, Heading, Stack, Text } from '@kadena/kode-ui';

import * as styles from './LayoutSurface.css';

interface Props {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  useLogoTitle?: boolean;
}

export const LayoutSurface = ({
  title,
  subtitle,
  children,
  useLogoTitle = false,
}: Props) => (
  <div className={styles.wrapper}>
    <Stack
      flexDirection="row"
      className={styles.logoWrapper}
      alignItems="flex-end"
    >
      <SpireKeyKdacolorLogoGreen className={styles.logo} />
      {useLogoTitle && (
        <Stack flexDirection="column">
          <Text transform="uppercase" variant="body">kadena</Text>
          <Heading>SpireKey</Heading>
        </Stack>
      )}
    </Stack>
    <Stack
      flexDirection="column"
      alignItems="flex-start"
      gap="md"
      className={styles.text}
    >
      {title && <Heading>{title}</Heading>}
      {subtitle && <Text>{subtitle}</Text>}
    </Stack>
    <div className={styles.content}>{children}</div>
  </div>
);
