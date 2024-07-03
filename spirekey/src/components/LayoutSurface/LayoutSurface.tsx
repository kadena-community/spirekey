import { SpireKeyKdacolorLogoGreen } from '@kadena/kode-icons/product';
import { Grid, Heading, Stack, Text } from '@kadena/kode-ui';

import * as styles from './LayoutSurface.css';

interface Props {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const LayoutSurface = ({ title, subtitle, children }: Props) => (
  <div className={styles.wrapper}>
    <div>
      <SpireKeyKdacolorLogoGreen className={styles.logo} />
    </div>
    <Stack
      flexDirection="column"
      alignItems="flex-start"
      gap="md"
      className={styles.text}
    >
      <Heading>{title}</Heading>
      <Text>{subtitle}</Text>
    </Stack>
    <div className={styles.content}>{children}</div>
  </div>
);
