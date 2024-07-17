import {
  SpireKeyKdacolorDark,
  SpireKeyKdacolorLight,
  SpireKeyKdacolorLogoGreen,
} from '@kadena/kode-icons/product';
import { Grid, Heading, Stack, Text, useTheme } from '@kadena/kode-ui';

import * as styles from './LayoutSurface.css';

interface Props {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  useLogoTitle?: boolean;
}
const Logo = ({ useLogoTitle }: { useLogoTitle: boolean }) => {
  const { theme } = useTheme();

  if (!useLogoTitle)
    return <SpireKeyKdacolorLogoGreen className={styles.logo} />;
  if (theme === 'dark')
    return <SpireKeyKdacolorDark className={styles.logoWithText} />;
  return <SpireKeyKdacolorLight className={styles.logoWithText} />;
};

export const LayoutSurface = ({
  title,
  subtitle,
  children,
  useLogoTitle = false,
}: Props) => {
  return (
    <div className={styles.wrapper}>
      <Stack
        flexDirection="row"
        className={styles.logoWrapper}
        alignItems="flex-end"
      >
        <Logo useLogoTitle={useLogoTitle} />
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
};
